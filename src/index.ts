import { createServer, IncomingMessage, ServerResponse } from 'http';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, TypeScript with Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
