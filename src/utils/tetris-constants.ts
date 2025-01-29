export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const LEVEL_SPEED = {
  1: 800,
  2: 720,
  3: 630,
  4: 550,
  5: 470,
  6: 380,
  7: 300,
  8: 220,
  9: 130,
  10: 100,
};

export const TETROMINO_COLORS = {
  1: '#F97316', // L piece
  2: '#0EA5E9', // J piece
  3: '#F2FCE2', // S piece
  4: '#FFDEE2', // Z piece
  5: '#8B5CF6', // T piece
  6: '#D946EF', // I piece
  7: '#FEC6A1', // O piece
};

export const TETROMINOES = {
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  S: [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0],
  ],
  Z: [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0],
  ],
  T: [
    [0, 5, 0],
    [5, 5, 5],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 0, 0],
    [6, 6, 6, 6],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [7, 7],
    [7, 7],
  ],
};