import { GamePhase, Team } from './enums';

export type ServerPayload = string;

export type Player = {
  name: string;
  team: Team;
  isSpy: boolean;
  isHost: boolean;
};

export type GameStatePayload = {
  phase: GamePhase;
  players: Record<string, Player>;
};
