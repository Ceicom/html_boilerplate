const nivel = process.argv.length > 2 ? process.argv.slice(2)[0].split('=')[1] : 1;
const dotdotslash = '../'.repeat(nivel);

const express = require(dotdotslash + 'midia-server/node_modules/express');
const dir = require(dotdotslash + 'midia-server/node_modules/node-dir');
const cors = require(dotdotslash + 'midia-server/node_modules/cors');
const HandleFile = require(dotdotslash + 'midia-server/handle-file');

const app = express();

const fs = require('fs');
const path = require('path');

const basePath = '';

// CORS ALL DOMAIN
app.use(cors());

/***************************************/

app.get('/getdir/:dir*', (req, res) => {
    const handleFile = new HandleFile(req.query);
    const directory = basePath + req.params.dir + req.params['0'],
        replace = directory.split('/').slice(0, -1).join('/');

    console.log(`getdir: ${directory}`);

    dir.files(directory, 'dir', (err, files) =>
        res.send(files ? handleFile.dealPaths(files, replace) : err));
});

/***************************************/

app.get('/getfile/:dir*', (req, res) => {
    const handleFile = new HandleFile(req.query);
    const directory = basePath + req.params.dir + req.params['0'];
    const bufdir = Buffer.from(directory);
    const list = fs.readdirSync(directory, { encoding: 'buffer' });
    const files = [];

    console.log(`getfile: ${directory}`);

    for (let i = 0, l = list.length; i < l; i++) {
        const fname = list[i].toString();
        const buffile = Buffer.concat([bufdir, Buffer.from(path.sep), list[i]]);
        const info = fs.statSync(buffile);

        if (!info.isDirectory() && handleFile.checkExt(path.extname(fname)))
            files.push({ fname, ...info });
    }

    files.sort((a, b) => b.birthtime - a.birthtime);

    res.send(files.map((item) => item.fname));
});

/***************************************/

app.listen(3000);
console.log('server started at port 3000');