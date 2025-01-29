import React from 'react';
import { TETROMINO_COLORS } from '../utils/tetris-constants';

interface TetrisBoardProps {
  board: number[][];
  currentPiece?: number[][];
  position?: { x: number; y: number };
}

const TetrisBoard: React.FC<TetrisBoardProps> = ({ board, currentPiece, position }) => {
  // Create a copy of the board to avoid mutating the original
  const displayBoard = board.map(row => [...row]);

  // Merge the current piece into the display board
  if (currentPiece && position) {
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
            displayBoard[boardY][boardX] = value;
          }
        }
      });
    });
  }

  return (
    <div className="game-board">
      {displayBoard.map((row, i) => (
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