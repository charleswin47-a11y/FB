const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 10000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let cleanUrl = decodeURI(req.url.split('?')[0]);
  let reqPath = cleanUrl === '/' ? '/index.html' : cleanUrl;
  let filePath = path.join(__dirname, reqPath);

  // Normalize path to prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acesso proibido.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    // If not found and has an extension (like .png or .css), return 404
    if (err || !stats.isFile()) {
      const ext = path.extname(cleanUrl);
      if (ext && ext !== '.html') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Arquivo não encontrado: ' + cleanUrl);
        return;
      }
      // If extensionless route, serve index.html (SPA / friendly routes)
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno do servidor.');
        return;
      }

      const headers = {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff'
      };

      if (ext === '.png' || ext === '.webp' || ext === '.jpg' || ext === '.svg' || ext === '.css' || ext === '.js') {
        headers['Cache-Control'] = 'public, max-age=86400';
      }

      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web Service Dra. Fabiana Barbosa rodando na porta ${PORT}`);
});
