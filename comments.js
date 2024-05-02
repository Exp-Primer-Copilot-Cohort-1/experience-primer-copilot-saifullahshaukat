const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  // Handle requests to base URL
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }

  // Handle requests for stylesheets
  else if (req.url.match(/.css$/)) {
    const cssPath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(cssPath);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fileStream.pipe(res);
  }

  // Handle requests for images
  else if (req.url.match(/.jpg$/)) {
    const imagePath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    fileStream.pipe(res);
  }

  // Handle 404 error
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Page Not Found</h1>');
  }

});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

