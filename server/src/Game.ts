import { Server } from 'socket.io';
import Player from './Player';
import { GamePhase, Team } from './enums';
import { GameStatePayload } from './types';

class Game {
  private io: Server;
  players: Record<string, Player> = {};
  phase: GamePhase = GamePhase.WAITING_START;

  constructor(io: Server) {
    this.io = io;
  }

  public registerPlayer(socketId: string, username: string) {
    if (this.players[socketId] === undefined) this.players[socketId] = new Player(username);
    else this.players[socketId].name = username;
  }

  public removePlayer(socketId: string) {
    if (this.players[socketId] === undefined) return;

    const pickNewHost = this.players[socketId].isHost && Object.keys(this.players).length > 1;

    delete this.players[socketId];

    if (pickNewHost) this.players[Object.keys(this.players)[0]].isHost = true;
  }

  public changePlayerTeam(socketId: string, team: Team, isSpy: boolean) {
    if (this.players[socketId] === undefined) return;
    this.players[socketId].team = team;
    this.players[socketId].isSpy = isSpy;
  }

  public getGameStatePayload(isSpy: boolean): GameStatePayload {
    return {
      phase: this.phase,
      players: this.players,
    };
  }

  public broadcastGameState() {
    Object.entries(this.players).forEach(([socketId, player]) => {
      this.io.to(socketId).emit('updateGameState', this.getGameStatePayload(player.isSpy));
    });
  }
}

export default Game;
