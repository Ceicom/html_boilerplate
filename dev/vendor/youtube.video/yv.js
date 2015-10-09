/*
    GET ALL VÍDEOS FROM YOU CHANNEL like youtube

    reference: -> https://developers.google.com/youtube/v3/

    made by: http://github.com/romuloinnocencio,
             http://github.com/kellerkichel
*/

// globalConfig
var youtube = function (settings){

    var config = {
        // element wrapper to insert the HTML structure
        wrapper: '.js-videoList',
        // máximo 50
        maxResults: 30,
        // thumb width
        thumbWidth: 196,
        // thumb height
        thumbHeight: 110,
        // order by -> ['date', 'viewCount', 'rating', 'videoCount', 'title', 'relevance']
        orderby: 'date',
        // generate you public key -> https://console.developers.google.com/project
        publickey: '',
        //callback
        after: null,
        //text title limit
        tittleLimit: 0,
        // nome do canal
        channelName: null,
        // elemento 
        element: '<div></div>',
        // todas informações?
        full: true

    };

    if(!settings.publickey)     throw new Error('Obrigatório informar Publickey da API');
    if(!settings.channelName)   throw new Error('Obrigatório informar nome Canal');

    if (settings.maxResults > 50 || settings.maxResults === 0){
        console.info('maxResults [ min: 1 | max: 50 ]');
        settings.maxResults = config.maxResults;
    }

    if (settings){ $.extend(config, settings); }

    // objects counter
    var countObj = function (obj){
        var size = 0, key;
        for (key in obj){ if (obj.hasOwnProperty(key)) size++; }
        return size;
    };


    /*

        EDIT IF YOU KNOW WHAT YOU ARE DOING :)

    */

    var videos = {
        init: function(){
            this.channelId = '';    // identificador do canal
            this.html = '';         // html full dos vídeos
            this.z = 0;             // contagem dos vídeos inseridos para inserir html no final
            
            this.openTag = config.element.split('><')[0];
            this.closeTag = config.element.split('><')[1];

            this.id(); // chamada inicial
        },

        // obtain the channel ID and start the function that will find the video list
        id: function(){
            var self = this;

            $.ajax({
                url:
                    'https://www.googleapis.com/youtube/v3/channels?part=id' +
                    '&forUsername=' + config.channelName +
                    '&key=' + config.publickey
            })
            .done(function (data){

                if(countObj(data.items)){
                    self.channelId = data.items[0].id;
                    self.listMovies();
                }else{
                    throw new Error('Não encontramos o canal '+config.channelName+' no youtube');
                }
            });
        },

        // obtain the video list
        listMovies: function(){
            var self = this;

            //console.info('https://www.googleapis.com/youtube/v3/search?part=snippet' +
            //        '&channelId=' + self.channelId +
            //        '&order=' + config.orderby +
            //        '&maxResults=' + config.maxResults +
            //        '&key=' + config.publickey);

            $.ajax({
                url:
                    'https://www.googleapis.com/youtube/v3/search?part=snippet' +
                    '&channelId=' + self.channelId +
                    '&order=' + config.orderby +
                    '&maxResults=' + config.maxResults +
                    '&key=' + config.publickey
            }).done(function (data) {

                // loop through videos
                $.each(data.items, function (k, v) {

                    if(!v.id.videoId){
                        config.maxResults--;
                        return true;
                    }

                    var infoVideo = {
                        day: v.snippet.publishedAt.substring(0, 10),
                        hour: v.snippet.publishedAt.substring(11, 16),
                        title: v.snippet.title,
                        image: v.snippet.thumbnails.high.url,
                        idvideo: v.id.videoId,
                        description: v.snippet.description
                    };

                    self.makeHtml(infoVideo,1);
                    
                    if(config.full) self.videoDetails(infoVideo);
                });
            });
        },

        // obtain: views and length of each video
        videoDetails: function (infoVideo){
            var self = this;

            $.ajax({
                /* 

                    if you need another proprieties of each video

                    PART: 
                    The part parameter specifies a comma-separated list of one or more channel resource properties that the API response will include.
                    [id, snippet, contentDetails, fileDetails ,player ,processingDetails ,recordingDetails ,statistics ,status ,suggestions ,topicDetails]

                */
                url:
                    'https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics' +
                    '&id=' + infoVideo.idvideo +
                    '&key=' + config.publickey
            })
            .done(function (data) {

                if (countObj(data.items)) {
                    xInfoVideo = {
                        time: self.convertTime(data.items[0].contentDetails.duration),
                        views: data.items[0].statistics.viewCount
                    };
                
                    $.extend(infoVideo, xInfoVideo);
                    self.makeHtml(infoVideo,2);
                } else {
                    config.maxResults--;
                }
            });
        },

        //gets video length and convert to time HH:MM:SS
        convertTime: function (time) {

            time = (time.indexOf('H') >= 0) ? time.replace('H', ':') : ':' + time;
            time = (time.indexOf('M') >= 0) ? time.replace('M', ':') : ':' + time ;
            time = time.replace(/[A-z]/g, '');

            String.prototype.preencherEsq = function (stringAdd, tamanhoFinal) {
                var str = this;
                while (str.length < tamanhoFinal)
                    str = stringAdd + str;
                return str;
            }

            var hora    = time.split(':')[0].preencherEsq(0, 2);
            var minuto  = time.split(':')[1].preencherEsq(0, 2);
            var segundo = time.split(':')[2].preencherEsq(0, 2);

            time = (hora != 00) ? hora + ':' + minuto + ':' + segundo : minuto + ':' + segundo;

            return time;

        },

        dealTitle: function(title){
            if(config.tittleLimit && title.length > config.tittleLimit){
                title = title.substring(0, config.tittleLimit) + '...';
            } 

            return title;
        },

        //build the structure for UL list
        makeHtml: function (infoVideo, step){
            var self = this;

            // layout inicial
            if(step == 1){
                var html = '<a class="yv-link" data-id="' + infoVideo.idvideo + '" href="https://www.youtube.com/watch?v=' + infoVideo.idvideo + '" title="' + infoVideo.title + '" target="_blank" rel="nofollow">' +
                                '<figure>' +
                                    '<img class="yv-img" class="video-img" src="http://api.buscade.com.br/thumb.php?src=' + infoVideo.image + '&w=' + config.thumbWidth + '&h=' + config.thumbHeight + '" width="' + config.thumbWidth + '" height="' + config.thumbHeight + '" alt="' + infoVideo.title + '">' +
                                    '<figcaption class="yv-desc">' +
                                        '<h3 class="yv-title">' + this.dealTitle(infoVideo.title)  + '</h3>' +
                                        '<time class="yv-date" datetime="'+infoVideo.day+'">' + infoVideo.day.split('-').reverse().join('/') + ' </time>' +
                                    '</figcaption>' +
                                '</figure>' +
                            '</a>';

                this.html += self.openTag+'>' + html + '<'+self.closeTag;
                this.z++;

                if (this.z === config.maxResults) this.putHtml();
            }

            // informações adicionais
            else if(step == 2){

                var html  = '<p class="yv-views">'+infoVideo.views+'</p>';
                    html += '<time class="yv-time" datetime="' + infoVideo.day + '">' + infoVideo.time + '</time>';

                $('[data-id="'+infoVideo.idvideo+'"]').find('figcaption').append(html);
            }
        },

        putHtml: function(){
            $(config.wrapper).prepend(this.html);
            if(config.callback) if(typeof(config.callback) == 'function') config.callback();
        },

    }.init();
};