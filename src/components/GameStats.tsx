import React from 'react';

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level, lines }) => {
  return (
    <div className="game-stats">
      <div>
        <h3 className="text-sm opacity-80">Score</h3>
        <p className="text-2xl font-bold">{score}</p>
      </div>
      <div>
        <h3 className="text-sm opacity-80">Level</h3>
        <p className="text-2xl font-bold">{level}</p>
      </div>
      <div>
        <h3 className="text-sm opacity-80">Lines</h3>
        <p className="text-2xl font-bold">{lines}</p>
      </div>
    </div>
  );
};

export default GameStats;