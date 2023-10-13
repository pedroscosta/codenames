import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GamePhase } from './enums';
import { socket } from './socket';

const Game = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.INPUT_USERNAME);

  const { roomId } = useParams();

  // Handle socket events
  useEffect(() => {
    const updateGamePhase = (phase: GamePhase) => setGamePhase(phase);

    socket.on('updateGamePhase', updateGamePhase);

    return () => {
      socket.off('updateGamePhase', updateGamePhase);
    };
  }, []);

  return (
    <>
      {roomId}
      {(() => {
        switch (gamePhase) {
          case GamePhase.INPUT_USERNAME:
          case GamePhase.WAITING_START:
          case GamePhase.PLAYING:
            return null;
        }
      })()}
    </>
  );
};

export default Game;
