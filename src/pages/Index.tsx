import { useTetris } from '../hooks/useTetris';
import TetrisBoard from '../components/TetrisBoard';
import NextPiece from '../components/NextPiece';
import GameStats from '../components/GameStats';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const Index = () => {
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

  return (
    <div className="tetris-container">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-8">Tetris</h1>
        <div className="flex gap-8">
          <div className="space-y-4">
            <NextPiece piece={nextPiece} type={nextPiece[0].find(cell => cell !== 0) || 1} />
            <GameStats score={score} level={level} lines={lines} />
            <div className="bg-black/20 p-4 rounded-lg text-white/80 text-sm space-y-2">
              <h3 className="font-bold mb-2">Controls:</h3>
              <p>← → : Move Left/Right</p>
              <p>↓ : Move Down</p>
              <p>↑ : Rotate</p>
              <p>Space : Hard Drop</p>
              <p>P : Pause Game</p>
            </div>
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
                onClick={resetGame}
                className="w-full"
                variant="destructive"
              >
                New Game
              </Button>
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
                    <Button onClick={resetGame} variant="secondary">
                      Play Again
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;