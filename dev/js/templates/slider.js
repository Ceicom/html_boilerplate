class getSliderData {

    constructor() {
        const me = this;

        // timeout var
        me.timer = null;

        // tempo padrão
        me.time = 5000;
    }

    init() {
        const me = this,
            data = {
                type: me.type
            };

        const r = $.ajax({
            method: 'GET',
            url: '/modulos/handlers/slider.ashx',
            data: data
        });

        r.then((data) => {
            if (!Object.keys(data).length){
                console.warn('retorno handler slider %cvazio ', 'color: red ');
                return;
            }
            me.doTemplate(data);
        }, () => console.warn('retorno handler slider %cinválido ', 'color: red ') );
    }

    doTemplate(data) {
        const me = this;

        let html = ``;

        $.each(data, function (key, value) {
            const url = value.Link ? 'href="' + (validaMail(value.Link) ? 'mailto:' + value.Link : validaURL(value.Link) ? value.Link + '" target="_blank" rel="noreferrer' : value.Link) + '\"' : '';
            const youtubeID = validaYoutube(value.Video);
            const img = value.Image ? value.Image : youtubeID ? `https://src.inf.br/thumb/generate.php?src=https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg&w=1920&h=960&zc=1` : null;

            if (!img)
                return;

            html +=
                `<div class="${youtubeID ? `w-video` : ``}" ${img ? `style="background-image: url('${img}')"` : ``}>
                    ${youtubeID ? `<div class="youtube" id="ytplayer_${key}" data-video="${youtubeID}"></div>` : ``}
                    <div class="content">
                        <header>
                            ${value.Frase ? `<h2>${value.Frase}</h2>`: ``}
                            ${value.TextoBotao ? `<a ${url} title="${value.TextoBotao}">${value.TextoBotao}</a>`: `` }
                        </header>
                    </div>
                </div>`;
        });

        return me.insertHtml(html);
    }

    insertHtml(html) {
        const me = this;

        if (!html) {
            me.wrapper.remove();
            return;
        }

        me.wrapper.html(html);
        me.callback();

        return me;
    }

    dealYoutubeSlides() {
        const me = this;
        const divYoutube = me.wrapper.find('.youtube');

        // carrega player
        function loadPlayer() {
            // https://developers.google.com/youtube/player_parameters#Parameters
            const options = {
                height: window.innerWidth,
                width: window.innerHeight,
                playerVars: {
                    autoplay: 0,
                    cc_load_policy: 0,
                    controls: 0,
                    disablekb: 1,
                    enablejsapi: 1,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            };

            me.players = {};

            divYoutube.each((k, el) => me.players[$(el).attr('id')] = new YT.Player($(el).attr('id'), { videoId: $(el).attr('data-video'), ...options }) );
        }

        // play youtube e tira volume
        function onPlayerReady(event) {
            event.target.mute();
            me.setTimerSlider();
        }

        // termino video?
        function onPlayerStateChange(event) {
            if (event.data === 0) me.changeSlide();
        }

        // possui video? chama js api youtube
        if (divYoutube.length) {
            if (typeof (YT) === 'undefined' || typeof (YT.Player) === 'undefined') {
                window.onYouTubeIframeAPIReady = () => loadPlayer();
                $.getScript('//www.youtube.com/iframe_api');
            } else
                loadPlayer();
        }
        else
            me.setTimerSlider();
    }

    changeSlide() {
        const me = this;
        const info = me.wrapper.data('owl.carousel');
        const current = info._current;
        const total = info._items.length - 1;

        let next = current + 1;

        if (current === total)
            next = 0;

        me.wrapper.trigger('to.owl.carousel', [next, 300]);
    }

    pauseYoutubeSlides() {
        const me = this;

        if (me.timer)
            clearTimeout(me.timer);

        $.each(me.players, (k, player) => {
            player.pauseVideo();
        });
    }

    playYoutubeSlide() {
        const me = this;
        const info = me.wrapper.data('owl.carousel');
        const current = info._current;
        const id = me.wrapper.find('.owl-stage').children().eq(current).find('.youtube[id]').attr('id');
        
        if (id) {
            const player = me.players[id];
            const currentTime = Math.ceil(player.getCurrentTime());
            const totalTime = Math.ceil(player.getDuration());

            // acabou video? volta pro tempo 0
            if (currentTime === totalTime)
                player.seekTo(0);

            player.playVideo();
        }
    }

    setTimerSlider() {
        const me = this;
        const info = me.wrapper.data('owl.carousel');
        const current = info._current;
        const video = me.wrapper.find('.owl-stage').children().eq(current).find('.youtube[id]').length;
        const time = me.time;

        if (me.timer)
            clearTimeout(me.timer);

        if (video)
            return me.playYoutubeSlide();

        me.timer = setTimeout(() => me.changeSlide(), time);
    }
}