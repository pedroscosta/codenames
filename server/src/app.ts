import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT ?? 3000;
const io = new Server(server);

app.use(cors());

app.get('/', (req, res) => {
  res.send('This is a socket.io only server!');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected`);
});

server.listen(port, () => {
  return console.log(`Express server is listening on port ${port}`);
});
