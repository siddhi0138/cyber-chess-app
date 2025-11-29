import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Lock,
  Bug,
  Mail,
  Database,
  Wifi,
  Users,
} from 'lucide-react';

const CyberChess = ({ onBackToMenu }) => {
  const vulnerabilityInfo = {
    K: {
      name: 'Zero-Day Exploit',
      icon: Bug,
      color: 'text-red-600',
      desc: 'Unknown vulnerabilities that have no patch. Like the king, this is the most critical threat - if exploited, game over!',
    },
    Q: {
      name: 'SQL Injection',
      icon: Database,
      color: 'text-purple-600',
      desc: 'Most powerful attack vector. Allows attackers to manipulate databases by injecting malicious SQL code through input fields.',
    },
    R: {
      name: 'DDoS Attack',
      icon: Wifi,
      color: 'text-blue-600',
      desc: 'Overwhelms systems with traffic. Like a rook moving in straight lines, it floods resources until they collapse.',
    },
    B: {
      name: 'Man-in-the-Middle',
      icon: Users,
      color: 'text-green-600',
      desc: 'Intercepts communications between two parties. Moves diagonally like secrets passed through compromised channels.',
    },
    N: {
      name: 'Phishing Attack',
      icon: Mail,
      color: 'text-yellow-600',
      desc: "Tricks users into revealing sensitive info. Unpredictable like the knight's L-shaped move - attacks from unexpected angles.",
    },
    P: {
      name: 'Weak Password',
      icon: Lock,
      color: 'text-gray-200',
      desc: 'The most common vulnerability. Small but numerous, like pawns - often the first line of defense to be breached.',
    },
  };

  const pieceIcons = {
    K: '♔',
    Q: '♕',
    R: '♖',
    B: '♗',
    N: '♘',
    P: '♙',
    k: '♚',
    q: '♛',
    r: '♜',
    b: '♝',
    n: '♞',
    p: '♙', // black pawns same symbol as white pawns
  };

  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('white');
  const [capturedInfo, setCapturedInfo] = useState(null);
  const [whiteCaptures, setWhiteCaptures] = useState([]);
  const [blackCaptures, setBlackCaptures] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const isWhite = (piece) => piece === piece?.toUpperCase();

  const isPathClear = (from, to, testBoard = board) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
      if (testBoard[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    return true;
  };

  const isValidMove = (from, to, piece, testBoard = board) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const targetPiece = testBoard[toRow][toCol];

    // can't capture your own piece
    if (targetPiece && isWhite(piece) === isWhite(targetPiece)) return false;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    const type = piece.toUpperCase();

    switch (type) {
      case 'P': {
        // ✅ MODIFIED: allow pawns to move both forward AND backward one step
        const forwardDirection = isWhite(piece) ? -1 : 1;
        const startRow = isWhite(piece) ? 6 : 1;

        // Move straight (no capture)
        if (toCol === fromCol && !targetPiece) {
          // 1 step forward
          if (toRow === fromRow + forwardDirection) return true;

          // 1 step backward (extra freedom for this learning game)
          if (toRow === fromRow - forwardDirection) return true;

          // 2-step forward from starting rank (classic pawn rule)
          if (
            fromRow === startRow &&
            toRow === fromRow + 2 * forwardDirection &&
            !testBoard[fromRow + forwardDirection][fromCol]
          ) {
            return true;
          }
        }

        // Capture diagonally (keep standard forward capture)
        if (
          Math.abs(toCol - fromCol) === 1 &&
          toRow === fromRow + forwardDirection &&
          targetPiece
        ) {
          return true;
        }

        return false;
      }

      case 'R':
        return (
          (fromRow === toRow || fromCol === toCol) &&
          isPathClear(from, to, testBoard)
        );
      case 'N':
        return (
          (rowDiff === 2 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 2)
        );
      case 'B':
        return rowDiff === colDiff && isPathClear(from, to, testBoard);
      case 'Q':
        return (
          (fromRow === toRow ||
            fromCol === toCol ||
            rowDiff === colDiff) && isPathClear(from, to, testBoard)
        );
      case 'K':
        return rowDiff <= 1 && colDiff <= 1;
      default:
        return false;
    }
  };

  const getAllValidMoves = (color, testBoard = board) => {
    const moves = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = testBoard[row][col];
        if (
          piece &&
          ((color === 'white' && isWhite(piece)) ||
            (color === 'black' && !isWhite(piece)))
        ) {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (isValidMove([row, col], [toRow, toCol], piece, testBoard)) {
                moves.push({ from: [row, col], to: [toRow, toCol], piece });
              }
            }
          }
        }
      }
    }
    return moves;
  };

  const evaluateMove = (move, testBoard) => {
    const [toRow, toCol] = move.to;
    const capturedPiece = testBoard[toRow][toCol];
    let score = 0;

    const pieceValues = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 100 };

    if (capturedPiece) {
      score += pieceValues[capturedPiece.toUpperCase()] * 10;
    }

    const centerSquares = [
      [3, 3],
      [3, 4],
      [4, 3],
      [4, 4],
    ];
    if (centerSquares.some(([r, c]) => r === toRow && c === toCol)) {
      score += 2;
    }

    score += Math.random() * 3;
    return score;
  };

  const executeMove = (from, to) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = board[fromRow][fromCol];
    const newBoard = board.map((r) => [...r]);
    const capturedPiece = newBoard[toRow][toCol];

    if (capturedPiece) {
      const vulnType = capturedPiece.toUpperCase();
      setCapturedInfo(vulnerabilityInfo[vulnType]);

      if (isWhite(piece)) {
        setWhiteCaptures((prev) => [...prev, vulnType]);
      } else {
        setBlackCaptures((prev) => [...prev, vulnType]);
      }

      if (vulnType === 'K') {
        setGameOver(true);
        setWinner(isWhite(piece) ? 'white' : 'black');
      }
    }

    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;
    setBoard(newBoard);
    setCurrentTurn((prev) => (prev === 'white' ? 'black' : 'white'));
  };

  const makeComputerMove = () => {
    const validMoves = getAllValidMoves('black');

    if (validMoves.length === 0) {
      setGameOver(true);
      setWinner('white');
      return;
    }

    let bestMove = validMoves[0];
    let bestScore = -Infinity;

    for (const move of validMoves) {
      const score = evaluateMove(move, board);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    executeMove(bestMove.from, bestMove.to);
  };

  const handleSquareClick = (row, col) => {
    // Only allow interaction on your turn and if game not over
    if (gameOver || currentTurn !== 'white') return;

    if (selected) {
      const [selRow, selCol] = selected;
      const piece = board[selRow][selCol];

      // If user clicked the same square again, toggle deselect
      if (selRow === row && selCol === col) {
        setSelected(null);
        return;
      }

      // If move is valid, execute it and clear selection
      if (isValidMove(selected, [row, col], piece)) {
        executeMove(selected, [row, col]);
        setSelected(null);
        return;
      }

      // If user clicked another white piece, switch selection to it
      const clickedPiece = board[row][col];
      if (clickedPiece && isWhite(clickedPiece)) {
        setSelected([row, col]);
        return;
      }

      // Otherwise keep the current selection so user can try a different target
      return;
    } else {
      const piece = board[row][col];
      if (piece && isWhite(piece)) {
        setSelected([row, col]);
      }
    }
  };

  useEffect(() => {
    if (currentTurn === 'black' && !gameOver) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentTurn, gameOver]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetGame = () => {
    setBoard(initialBoard);
    setSelected(null);
    setCurrentTurn('white');
    setCapturedInfo(null);
    setWhiteCaptures([]);
    setBlackCaptures([]);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToMenu}
            className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-600 text-gray-200 hover:bg-slate-700 transition"
          >
            ⟵ Back to Rules
          </button>
          <span className="hidden md:inline-block text-xs text-slate-300">
            Tip: Try to control the center like a real chess game!
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-cyan-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Cybersecurity Chess
            </h1>
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-cyan-200 text-base md:text-lg">
            You vs Computer - Capture pieces to learn about cybersecurity vulnerabilities!
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Panel - Your Defenses */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-cyan-500/30">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              Your Defenses (White)
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {whiteCaptures.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No vulnerabilities patched yet
                </p>
              ) : (
                whiteCaptures.map((v, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded p-2 text-sm text-white"
                  >
                    {vulnerabilityInfo[v].name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Center - Chess Board */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-amber-900 to-amber-700 p-3 md:p-4 rounded-lg shadow-2xl mb-4">
              <div className="grid grid-cols-8 gap-0 border-4 border-amber-950">
                {board.map((row, rowIndex) =>
                  row.map((piece, colIndex) => {
                    const isLight = (rowIndex + colIndex) % 2 === 0;
                    const isSelected =
                      selected?.[0] === rowIndex &&
                      selected?.[1] === colIndex;

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl md:text-3xl cursor-pointer transition-all
                          ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                          ${isSelected ? 'ring-4 ring-cyan-400' : ''}
                          hover:opacity-80`}
                      >
                        {piece && (
                          <span
                            style={{
                              color: isWhite(piece) ? '#FFFFFF' : '#000000',
                              textShadow: isWhite(piece)
                                ? '0 2px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.5)'
                                : '0 1px 2px rgba(255,255,255,0.8), 0 0 1px rgba(255,255,255,0.6)',
                            }}
                          >
                            {pieceIcons[piece]}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Turn / Status */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="text-white font-bold bg-slate-800/70 px-4 py-2 rounded text-sm md:text-base">
                {gameOver ? (
                  <span className="text-yellow-400">
                    {winner === 'white' ? '🎉 You Win!' : '💻 Computer Wins!'}
                  </span>
                ) : (
                  <>
                    Turn:{' '}
                    <span
                      className={
                        currentTurn === 'white'
                          ? 'text-cyan-400'
                          : 'text-red-400'
                      }
                    >
                      {currentTurn === 'white'
                        ? 'Your Turn'
                        : 'Computer Thinking...'}
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={resetGame}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition text-sm md:text-base"
              >
                Reset Game
              </button>
            </div>
          </div>

          {/* Right Panel - Computer Exploits */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-red-500/30">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Computer Exploits (Black)
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {blackCaptures.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No vulnerabilities exploited yet
                </p>
              ) : (
                blackCaptures.map((v, i) => (
                  <div
                    key={i}
                    className="bg-red-500/20 rounded p-2 text-sm text-white"
                  >
                    {vulnerabilityInfo[v].name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Vulnerability Info Display */}
        {capturedInfo && (
          <div className="mt-8 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur rounded-lg p-6 border-2 border-cyan-400/50 animate-pulse">
            <div className="flex items-start gap-4">
              {(() => {
                const CapturedIcon = capturedInfo.icon;
                return (
                  <CapturedIcon
                    className={`w-12 h-12 ${capturedInfo.color}`}
                  />
                );
              })()}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {capturedInfo.name}
                </h3>
                <p className="text-cyan-100 text-lg">{capturedInfo.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-cyan-500/30">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" />
            Vulnerability Legend
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(vulnerabilityInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <div key={key} className="bg-slate-700/50 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${info.color}`} />
                    <span className="text-white font-bold">
                      {key === 'K'
                        ? '♔/♚'
                        : key === 'Q'
                        ? '♕/♛'
                        : key === 'R'
                        ? '♖/♜'
                        : key === 'B'
                        ? '♗/♝'
                        : key === 'N'
                        ? '♘/♞'
                        : '♙/♟'}
                    </span>
                    <span className="text-cyan-300 text-sm font-semibold">
                      {info.name}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs">{info.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberChess;
