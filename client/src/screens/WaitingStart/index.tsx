import { HStack, Heading, VStack } from '@chakra-ui/react';
import { Team } from '../../enums';
import { Player, ServerPayload } from '../../types';
import TeamDisplay from './components/TeamDisplay';

const WaitingStart = ({
  players,
  sendToServer,
}: {
  players: Player[];
  sendToServer: (event: string, payload: ServerPayload) => void;
}) => {
  const teams: Record<keyof typeof Team, { players: Player[]; spies: Player[] }> = {
    RED: {
      players: [],
      spies: [],
    },
    BLUE: {
      players: [],
      spies: [],
    },
    GREEN: {
      players: [],
      spies: [],
    },
    YELLOW: {
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
      <HStack spacing={12}>
        {Object.entries(teams).map(([team, players]) => (
          <TeamDisplay
            team={team as keyof typeof Team}
            players={players.players}
            spies={players.spies}
            sendToServer={sendToServer}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default WaitingStart;
