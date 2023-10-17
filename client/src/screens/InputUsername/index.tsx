import { Button, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { ServerPayload } from '../../types';

type InputUsernameProps = {
  sendToServer: (event: string, payload: ServerPayload) => void;
};

const InputUsername = ({ sendToServer }: InputUsernameProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <VStack>
      <Input
        placeholder="Your name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        onClick={() => {
          sendToServer('registerPlayer', inputValue);
        }}
      >
        Join
      </Button>
    </VStack>
  );
};

export default InputUsername;
