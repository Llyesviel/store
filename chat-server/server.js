const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 4000;

const clients = new Map();

wss.on('connection', (ws, req) => {
  const clientId = Date.now();
  const url = new URL(req.url, 'http://localhost:4000');
  const clientType = url.searchParams.get('type') || 'unknown';
  
  clients.set(ws, { id: clientId, type: clientType });

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    clients.forEach((client, clientWs) => {
      if (clientWs !== ws && clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({
          type: 'message',
          clientId,
          clientType: clients.get(ws).type,
          content: data.content,
          timestamp: new Date().toISOString()
        }));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

server.listen(PORT, () => {
  console.log(`Чат сервер запущен на порту ${PORT}`);
}); 