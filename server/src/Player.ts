import { Team } from './enums';

class Player {
  name: string;
  team: Team | undefined = undefined;
  isSpy: boolean = false;
  isHost: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}

export default Player;
