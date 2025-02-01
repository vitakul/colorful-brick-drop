import { useState, useEffect, useCallback } from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT, LEVEL_SPEED, TETROMINOES } from '../utils/tetris-constants';

const createEmptyBoard = () => 
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const getRandomTetromino = () => {
  const pieces = Object.keys(TETROMINOES);
  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  return TETROMINOES[randomPiece as keyof typeof TETROMINOES];
};

export const useTetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(getRandomTetromino());
  const [nextPiece, setNextPiece] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showGhostPiece, setShowGhostPiece] = useState(true);

  const checkCollision = useCallback((piece: number[][], pos: { x: number; y: number }) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const getGhostPosition = useCallback(() => {
    let ghostY = position.y;
    
    while (!checkCollision(currentPiece, { x: position.x, y: ghostY + 1 })) {
      ghostY++;
    }
    
    return { x: position.x, y: ghostY };
  }, [currentPiece, position, checkCollision]);

  const rotatePiece = useCallback(() => {
    const rotated = currentPiece[0].map((_, i) =>
      currentPiece.map(row => row[row.length - 1 - i])
    );
    if (!checkCollision(rotated, position)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, position, checkCollision]);

  const moveHorizontally = useCallback((dir: number) => {
    if (!checkCollision(currentPiece, { x: position.x + dir, y: position.y })) {
      setPosition(prev => ({ ...prev, x: prev.x + dir }));
    }
  }, [currentPiece, position, checkCollision]);

  const mergePieceToBoard = useCallback(() => {
    const newBoard = board.map(row => [...row]);
    
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const newY = position.y + y;
          const newX = position.x + x;
          
          if (
            newY >= 0 && 
            newY < BOARD_HEIGHT && 
            newX >= 0 && 
            newX < BOARD_WIDTH
          ) {
            newBoard[newY][newX] = value;
          }
        }
      });
    });
    
    return newBoard;
  }, [board, currentPiece, position]);

  const checkLines = useCallback((newBoard: number[][]) => {
    let linesCleared = 0;
    const updatedBoard = newBoard.filter(row => {
      const isLine = row.every(cell => cell !== 0);
      if (isLine) linesCleared++;
      return !isLine;
    });

    while (updatedBoard.length < BOARD_HEIGHT) {
      updatedBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared);
      setScore(prev => prev + (linesCleared * 100 * level));
      setLevel(prev => Math.min(10, Math.floor((lines + linesCleared) / 10) + 1));
    }

    return updatedBoard;
  }, [level, lines]);

  const moveDown = useCallback(() => {
    if (!checkCollision(currentPiece, { x: position.x, y: position.y + 1 })) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      if (position.y <= 0) {
        setGameOver(true);
        return;
      }
      const newBoard = mergePieceToBoard();
      setBoard(checkLines(newBoard));
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomTetromino());
      setPosition({ x: 3, y: 0 });
    }
  }, [currentPiece, nextPiece, position, checkCollision, mergePieceToBoard, checkLines]);

  const hardDrop = useCallback(() => {
    let newY = position.y;
    while (!checkCollision(currentPiece, { x: position.x, y: newY + 1 })) {
      newY++;
    }
    
    // Create a new board with the merged piece at the final position
    const newBoard = board.map(row => [...row]);
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = newY + y;
          const boardX = position.x + x;
          if (
            boardY >= 0 && 
            boardY < BOARD_HEIGHT && 
            boardX >= 0 && 
            boardX < BOARD_WIDTH
          ) {
            newBoard[boardY][boardX] = value;
          }
        }
      });
    });

    // Update the board first
    const clearedBoard = checkLines(newBoard);
    setBoard(clearedBoard);
    
    // Then set up the next piece
    setCurrentPiece(nextPiece);
    setNextPiece(getRandomTetromino());
    setPosition({ x: 3, y: 0 });
  }, [currentPiece, nextPiece, position, board, checkCollision, checkLines]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      const interval = setInterval(() => {
        moveDown();
      }, LEVEL_SPEED[level as keyof typeof LEVEL_SPEED]);

      return () => clearInterval(interval);
    }
  }, [gameOver, isPaused, level, moveDown]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver || isPaused) return;

      switch (event.key) {
        case 'ArrowLeft':
          moveHorizontally(-1);
          break;
        case 'ArrowRight':
          moveHorizontally(1);
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case 'y':
          hardDrop();
          break;
        case 'p':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused, moveHorizontally, moveDown, rotatePiece, hardDrop]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomTetromino());
    setNextPiece(getRandomTetromino());
    setPosition({ x: 3, y: 0 });
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
  }, []);

  return {
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
  };
};

export default useTetris;
