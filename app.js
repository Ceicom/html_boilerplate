const nivel = process.argv.length > 2 ? process.argv.slice(2)[0].split('=')[1] : 1,
	dotdotslash = '../'.repeat(nivel),
    express = require(dotdotslash + 'midia-server/node_modules/express'),
    dir = require(dotdotslash + 'midia-server/node_modules/node-dir'),
    funcs = require(dotdotslash + 'midia-server/funcs'),
    cors = require(dotdotslash + 'midia-server/node_modules/cors'),
    app = express(),
    basePath = '';

// CORS ALL DOMAIN
app.use(cors());

/***************************************/

app.get('/getdir/:dir*', function(req, res){
	const directory = basePath + req.params.dir + req.params['0'],
		  replace = directory.split('/').slice(0,-1).join('/');

    console.log('getdir: ' + directory);

	dir.files(directory, 'dir', function(err, files) {
		const info = files ? funcs.dealPaths(files, replace) : err;
		res.send(info);
  	});
});

/***************************************/

app.get('/getfile/:dir*', function(req, res){
	const directory = basePath + req.params.dir + req.params['0'];

    console.log('getfile: ' + directory);

	dir.files(directory, 'file', function(err, files) {
		const info = files ? funcs.dealFiles(files) : err;
		res.send(info);
  	}, {
  		shortName: true,
  		recursive: false
  	});
});

/***************************************/

app.listen(3000);
console.log('server started ate port 3000');