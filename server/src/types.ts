import Player from './Player';
import { GamePhase } from './enums';

export type ClientPayload = {
  room: string;
  payload: string;
};

export type GameStatePayload = {
  phase: GamePhase;
  players: Record<string, Player>;
};
