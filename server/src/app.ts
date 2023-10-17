import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Game from './Game';
import { ClientPayload } from './types';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT ?? 3000;
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const rooms: Record<string, Game> = {};
const socketRooms: Record<string, string> = {};

app.use(cors());

app.get('/', (req, res) => {
  res.send('This is a socket.io only server!');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected`);

  socket.on('registerPlayer', (req: ClientPayload) => {
    let newGame = rooms[req.room] === undefined;
    if (newGame) rooms[req.room] = new Game(io);

    const game = rooms[req.room];

    game.registerPlayer(socket.id, req.payload);
    socketRooms[socket.id] = req.room;

    if (newGame) game.players[socket.id].isHost = true;

    game.broadcastGameState();
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`);
    if (socketRooms[socket.id] !== undefined) {
      rooms[socketRooms[socket.id]].removePlayer(socket.id);
      rooms[socketRooms[socket.id]].broadcastGameState();
    }
  });
});

server.listen(port, () => {
  return console.log(`Express server is listening on port ${port}`);
});
