import React from 'react';
import { TETROMINO_COLORS } from '../utils/tetris-constants';

interface TetrisBoardProps {
  board: number[][];
  currentPiece?: number[][];
  position?: { x: number; y: number };
  ghostPiece?: number[][];
  ghostPosition?: { x: number; y: number };
}

const TetrisBoard: React.FC<TetrisBoardProps> = ({ 
  board, 
  currentPiece, 
  position,
  ghostPiece,
  ghostPosition 
}) => {
  // Create a copy of the board to avoid mutating the original
  const displayBoard = board.map(row => [...row]);

  // Add ghost piece to the display board first (so it appears behind the actual piece)
  if (ghostPiece && ghostPosition) {
    ghostPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = ghostPosition.y + y;
          const boardX = ghostPosition.x + x;
          if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
            // Use negative values to represent ghost pieces (for different styling)
            displayBoard[boardY][boardX] = value * -1;
          }
        }
      });
    });
  }

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
                backgroundColor: cell !== 0 
                  ? TETROMINO_COLORS[Math.abs(cell)]
                  : 'transparent',
                opacity: cell < 0 ? 0.3 : 1, // Ghost pieces are semi-transparent
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisBoard;