import { Heading, VStack } from '@chakra-ui/react';
import { Team } from '../../enums';
import { Player } from '../../types';
import TeamDisplay from './components/TeamDisplay';

const WaitingStart = ({ players }: { players: Player[] }) => {
  const teams: Record<Team, { players: Player[]; spies: Player[] }> = {
    [Team.RED]: {
      players: [],
      spies: [],
    },
    [Team.BLUE]: {
      players: [],
      spies: [],
    },
    [Team.GREEN]: {
      players: [],
      spies: [],
    },
    [Team.YELLOW]: {
      players: [],
      spies: [],
    },
  };

  players.forEach((p) => {
    if (p.team === undefined) return;
    if (p.isSpy) teams[p.team].spies.push(p);
    else teams[p.team].players.push(p);
  });

  return (
    <VStack>
      <Heading>Pick your team:</Heading>
      {Object.entries(teams).map(([team, players]) => (
        <TeamDisplay
          team={Team[team as keyof typeof Team]}
          players={players.players}
          spies={players.spies}
        />
      ))}
    </VStack>
  );
};

export default WaitingStart;
