const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (!pathname || pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Incorrect filename');
        break;
      }

      if (!fs.existsSync(filepath)) {
        res.statusCode = 404;
        res.end('File not found');
        break;
      }

      fs.unlink(filepath, (err) => {
        if (err) {
          res.statusCode = 500;
          res.end('Something went wrong');
        }
        res.statusCode = 200;
        res.end('Success');
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
