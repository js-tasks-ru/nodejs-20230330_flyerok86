const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');
const server = new http.Server();


server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      if (!pathname || pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Incorrect filename');
      }

      const limitedStream = new LimitSizeStream({limit: 1048576, encoding: 'utf-8'});
      const outStream = fs.createWriteStream(filepath, {flags: 'wx'});

      req.pipe(limitedStream).pipe(outStream);

      outStream.on('finish', () => {
        res.statusCode = 201;
        res.end('Success');
      });

      limitedStream.on('error', (error) => {
        if (error.code === 'LIMIT_EXCEEDED') {
          res.statusCode = 413;
          res.end('Limit has been exceeded.');
        } else {
          res.statusCode = 500;
          res.end('Something went wrong');
        }
        fs.unlink(filepath, (err) => {
        });
      });

      outStream.on('error', (error) => {
        if (error.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('File exists');
        } else {
          res.statusCode = 500;
          res.end('Something went wrong');
        }
      });

      req.on('aborted', () => {
        fs.unlink(filepath, (err) => {
        });
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
