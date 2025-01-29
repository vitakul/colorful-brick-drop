import React from 'react';
import { TETROMINO_COLORS } from '../utils/tetris-constants';

interface NextPieceProps {
  piece: number[][];
  type: number;
}

const NextPiece: React.FC<NextPieceProps> = ({ piece, type }) => {
  return (
    <div className="next-piece-preview">
      <h3 className="text-white mb-2">Next Piece</h3>
      <div className="grid grid-cols-4 gap-1">
        {piece.map((row, i) => (
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-6 h-6"
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