const express = require('express');
const net = require('net');
const path = require('path');
const app = express();

// Required for SharedArrayBuffer (used by ffmpeg.wasm)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.static(path.join(__dirname)));

function findOpenPort(start) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => resolve(findOpenPort(start + 1)));
    server.listen(start, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

findOpenPort(3000).then(port => {
  app.listen(port, () => {
    console.log(`\n  Video → WebP`);
    console.log(`  Open: http://localhost:${port}\n`);
  });
});
