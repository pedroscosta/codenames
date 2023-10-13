import { Button, HStack, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateRoomId = () => {
  let key = '';
  const characters = 'qwertyuiopasdfghjklzxcvbnm';

  for (const segment of [4, 4, 4]) {
    for (let i = 0; i < segment; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    key += '-';
  }

  return key.slice(0, -1);
};
const NoRoom = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  return (
    <VStack spacing={16}>
      <Heading size="2xl">Codenames</Heading>
      <VStack>
        <HStack>
          <Input
            placeholder="Room code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={() => {
              navigate(`/room/${inputValue}`);
            }}
          >
            Join
          </Button>
        </HStack>
        <Text>or</Text>
        <Button
          w="100%"
          onClick={() => {
            navigate(`/room/${generateRoomId()}`);
          }}
        >
          Create a room
        </Button>
      </VStack>
      <Text>
        This is an unofficial{' '}
        <Link color="teal.500" href="https://github.com/pedroscosta/codenames/">
          open source
        </Link>{' '}
        game based on the{' '}
        <Link color="teal.500" href="https://codenames.game/">
          official codenames
        </Link>
      </Text>
    </VStack>
  );
};

export default NoRoom;
