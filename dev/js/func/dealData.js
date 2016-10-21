var dealData = function( data ){    

    /*
        [FORMATO DE ENTRADA PADRÃO]
		'01/05/2016' ou '01/05/2016 13:34:00'
    */

	var r = {};
	var date = data.split(' ');
    var monthExt = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	

	r.datetime = date[0].split('/').reverse().join('-');
	r.day = date[0].split('/')[0];
    r.monthAbr = monthExt[ date[0].split('/')[1]-1 ].substring(0,3);
    r.monthExt = monthExt[ date[0].split('/')[1]-1 ];
    r.month = date[0].split('/')[1];
    r.year = date[0].split('/')[2];

	if( data.indexOf(' ') > -1 ){

		r.fullhour = date[1].split(':')[0] + ':' + date[1].split(':')[1];
		r.hour = date[1].split(':')[0];
	    r.minute = date[1].split(':')[1];
	    r.second = date[1].split(':')[2];	

	}    

    return r;
}

/*
      [MODO DE USAR]
      ----
      var data = dealData('01/05/2016 13:34:00');   

        console.info( data.day );
        console.info( data.monthAbr );
        console.info( data.monthExt );
        console.info( data.monthNum );
        console.info( data.fullHour );
        console.info( data.year );
        console.info( data.hour );
        console.info( data.minute );
        console.info( data.second );
*/