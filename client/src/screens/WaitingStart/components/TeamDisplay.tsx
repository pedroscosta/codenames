import { Box, Text } from '@chakra-ui/react';
import { Team } from '../../../enums';
import { Player } from '../../../types';

const TeamDisplay = ({
  team,
  players,
  spies,
}: {
  team: Team;
  players: Player[];
  spies: Player[];
}) => {
  return (
    <Box borderWidth="1px" borderColor="gray.600">
      {team}
      <Text>Spies:</Text>
      {JSON.stringify(spies)}
      <Text>Players:</Text>
      {JSON.stringify(players)}
    </Box>
  );
};

export default TeamDisplay;
