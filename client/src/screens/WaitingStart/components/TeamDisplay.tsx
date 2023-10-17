import { Box, Button, Heading, Tag, Text } from '@chakra-ui/react';
import { Team } from '../../../enums';
import { Player, ServerPayload } from '../../../types';

type TeamDisplayProps = {
  team: keyof typeof Team;
  players: Player[];
  spies: Player[];
  sendToServer: (event: string, payload: ServerPayload) => void;
};

const TeamDisplay = ({ team, players, spies, sendToServer }: TeamDisplayProps) => {
  const chooseTeam = (team: keyof typeof Team, isSpy: boolean = false) => {
    sendToServer('chooseTeam', { team, isSpy });
  };

  return (
    <Box
      borderRadius="lg"
      border="2px solid"
      borderColor={`${team.toString().toLocaleLowerCase()}.800`}
      p={2}
      w={40}
      h="100%"
    >
      <Heading size="sm" w="100%" textAlign="center">
        {team}
      </Heading>
      <Text>Spies:</Text>
      {spies.map((spy, index) => (
        <Tag key={index}>{spy.name}</Tag>
      ))}
      {spies.length === 0 && (
        <Button w="100%" h={7} variant="outline" onClick={() => chooseTeam(team, true)}>
          Join as spy
        </Button>
      )}
      <Text>Operatives:</Text>
      {players.map((player, index) => (
        <Tag key={index}>{player.name}</Tag>
      ))}
      {
        <Button
          w="100%"
          h={7}
          variant="outline"
          onClick={() => chooseTeam(team, false)}
          marginTop={1}
        >
          Join as operative
        </Button>
      }
    </Box>
  );
};

export default TeamDisplay;
