import React from 'react';
import { TETROMINO_COLORS } from '../utils/tetris-constants';

interface TetrisBoardProps {
  board: number[][];
}

const TetrisBoard: React.FC<TetrisBoardProps> = ({ board }) => {
  return (
    <div className="game-board">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="tetris-cell"
              style={{
                backgroundColor: cell ? TETROMINO_COLORS[cell] : 'transparent',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisBoard;