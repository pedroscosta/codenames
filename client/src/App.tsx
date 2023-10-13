import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Game';
import NoRoom from './screens/NoRoom';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flex="1 1 auto"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<NoRoom />} />
            <Route path="room/:roomId" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
