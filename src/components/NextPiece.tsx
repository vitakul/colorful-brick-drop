import React from 'react';
import { TETROMINO_COLORS } from '../utils/tetris-constants';

interface NextPieceProps {
  piece: number[][];
  type: number;
}

const NextPiece: React.FC<NextPieceProps> = ({ piece, type }) => {
  // Calculate the size of the preview grid based on the piece
  const gridSize = Math.max(piece.length, piece[0]?.length || 0);
  
  // Create a centered grid for the piece
  const centeredGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  const offsetY = Math.floor((4 - piece.length) / 2);
  const offsetX = Math.floor((4 - (piece[0]?.length || 0)) / 2);

  // Place the piece in the center of the grid
  piece.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        centeredGrid[y + offsetY][x + offsetX] = cell;
      }
    });
  });

  return (
    <div className="next-piece-preview">
      <h3 className="text-white mb-2">Next Piece</h3>
      <div className="grid grid-cols-4 gap-1 w-32 h-32 p-2">
        {centeredGrid.map((row, i) => (
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-6 h-6 border border-white/10 rounded-sm"
              style={{
                backgroundColor: cell ? TETROMINO_COLORS[type] : 'transparent',
              }}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default NextPiece;