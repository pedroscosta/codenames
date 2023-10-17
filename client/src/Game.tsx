/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GamePhase } from './enums';
import InputUsername from './screens/InputUsername';
import WaitingStart from './screens/WaitingStart';
import { socket } from './socket';
import { GameStatePayload, ServerPayload } from './types';

const Game = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.INPUT_USERNAME);
  const [players, setPlayers] = useState<GameStatePayload['players']>({});

  const { roomId } = useParams();

  // Handle socket events
  useEffect(() => {
    const updateGameState = (payload: GameStatePayload) => {
      setGamePhase(payload.phase);
      setPlayers(payload.players);
    };

    // socket.emit('requestGameStatus', {room: roomId});

    socket.on('updateGameState', updateGameState);

    return () => {
      socket.off('updateGameState', updateGameState);
    };
  }, []);

  const sendToServer = (event: string, payload: ServerPayload) => {
    socket.emit(event, { room: roomId, payload });
  };

  return (
    <>
      {roomId}
      {(() => {
        switch (gamePhase) {
          case GamePhase.INPUT_USERNAME:
            return <InputUsername sendToServer={sendToServer} />;
          case GamePhase.WAITING_START:
            return <WaitingStart players={Object.values(players)} sendToServer={sendToServer} />;
          case GamePhase.PLAYING:
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Game;
