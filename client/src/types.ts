import { GamePhase, Team } from './enums';

export type ChangeTeamPayload = { team: keyof typeof Team; isSpy: boolean };

export type ServerPayload = string | ChangeTeamPayload;

export type Player = {
  name: string;
  team: keyof typeof Team;
  isSpy: boolean;
  isHost: boolean;
};

export type GameStatePayload = {
  phase: GamePhase;
  players: Record<string, Player>;
};
