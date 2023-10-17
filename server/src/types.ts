import Game from './Game';
import Player from './Player';
import { GamePhase, Team } from './enums';

export type ChangeTeamPayload = { team: Team; isSpy: boolean };

export type UnpopulatedClientPayload = {
  room: string;
  payload: string | ChangeTeamPayload;
};

export type ClientPayload = UnpopulatedClientPayload & {
  game: Game;
};

export type GameStatePayload = {
  phase: GamePhase;
  players: Record<string, Player>;
};
