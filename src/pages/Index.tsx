import { useTetris } from '../hooks/useTetris';
import TetrisBoard from '../components/TetrisBoard';
import NextPiece from '../components/NextPiece';
import GameStats from '../components/GameStats';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import Leaderboard from '../components/Leaderboard';
import NicknameDialog from '../components/NicknameDialog';
import { useEffect, useState } from 'react';
import { LEVEL_SPEED } from '../utils/tetris-constants';

const Index = () => {
  const [showNicknameDialog, setShowNicknameDialog] = useState(false);
  const [previousNicks, setPreviousNicks] = useState<string[]>([]);
  const [currentNick, setCurrentNick] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<Array<{ nick: string; score: number }>>([]);

  const {
    board,
    score,
    level,
    lines,
    gameOver,
    isPaused,
    nextPiece,
    currentPiece,
    position,
    resetGame,
    setIsPaused,
    showGhostPiece,
    setShowGhostPiece,
    getGhostPosition
  } = useTetris();

  useEffect(() => {
    // Load previous nicknames and leaderboard from localStorage
    const storedNicks = JSON.parse(localStorage.getItem('previousNicks') || '[]');
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setPreviousNicks(storedNicks);
    setLeaderboard(storedLeaderboard);
  }, []);

  useEffect(() => {
    if (gameOver && currentNick) {
      const newLeaderboard = [...leaderboard, { nick: currentNick, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      
      setLeaderboard(newLeaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [gameOver, currentNick, score, leaderboard]);

  const handleNewGame = () => {
    setShowNicknameDialog(true);
  };

  const handleNicknameSubmit = (nickname: string) => {
    setCurrentNick(nickname);
    if (!previousNicks.includes(nickname)) {
      const newNicks = [...previousNicks, nickname].slice(-5);
      setPreviousNicks(newNicks);
      localStorage.setItem('previousNicks', JSON.stringify(newNicks));
    }
    setShowNicknameDialog(false);
    resetGame();
  };

  return (
    <div className="tetris-container">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-8">Tetris</h1>
        <div className="flex gap-8">
          <div className="space-y-4">
            <Leaderboard entries={leaderboard} />
            <NextPiece piece={nextPiece} type={nextPiece[0].find(cell => cell !== 0) || 1} />
            <GameStats 
              score={score} 
              level={level} 
              lines={lines} 
              speed={LEVEL_SPEED[level as keyof typeof LEVEL_SPEED]}
            />
            <div className="bg-black/20 p-4 rounded-lg text-white/80 text-sm space-y-2">
              <h3 className="font-bold mb-2">Controls:</h3>
              <p>← → : Move Left/Right</p>
              <p>↓ : Move Down</p>
              <p>↑ : Rotate</p>
              <p>Space : Hard Drop</p>
              <p>P : Pause Game</p>
            </div>
          </div>
          <div className="relative">
            <TetrisBoard 
              board={board} 
              currentPiece={currentPiece} 
              position={position}
              ghostPiece={showGhostPiece ? currentPiece : undefined}
              ghostPosition={showGhostPiece ? getGhostPosition() : undefined}
            />
            {(gameOver || isPaused) && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-white text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    {gameOver ? 'Game Over!' : 'Paused'}
                  </h2>
                  {gameOver && (
                    <Button onClick={handleNewGame} variant="secondary">
                      Play Again
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Switch
                  id="ghost-piece"
                  checked={showGhostPiece}
                  onCheckedChange={setShowGhostPiece}
                />
                <Label htmlFor="ghost-piece" className="text-white">Show Ghost Piece</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => isPaused ? setIsPaused(false) : setIsPaused(true)}
                className="w-full"
                variant="secondary"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                onClick={handleNewGame}
                className="w-full"
                variant="destructive"
              >
                New Game
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NicknameDialog
        open={showNicknameDialog}
        onClose={() => setShowNicknameDialog(false)}
        onSubmit={handleNicknameSubmit}
        previousNicks={previousNicks}
      />
    </div>
  );
};

export default Index;