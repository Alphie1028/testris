import React, { createContext, useState, useEffect } from "react";

const GeneratePieceContext = createContext();

const pieces = [
    [
        [1, 1],
        [1, 1],
    ],
    [
        [1, 1, 1, 1],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
    ],
];

export const GeneratePieceProvider = ({ children }) => {
    const [piece, setPiece] = useState(pieces[Math.floor(Math.random() * pieces.length)]);
    const arr = Array.from({ length: 20 }, () => Array(10).fill(0));
    const emptyBoard = fillBoard(arr);
    const [board, setBoard] = useState(emptyBoard);
    const [pieceActive, setPieceActive] = useState(false);
    const [activeSquares, setActiveSquares] = useState([]);

    const arraysEqual = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    };

    const canMovePiece = (squares) => {
        for (let i = 0; i < squares.length; i++) {
            const [newRowIndex, newCellIndex] = squares[i];

            if (newRowIndex < 0 || newRowIndex >= board.length || newCellIndex < 0 || newCellIndex >= board[0].length) {
                return false;
            }

            if (activeSquares.find((square) => !arraysEqual(square, [newRowIndex, newCellIndex])) && board[newRowIndex][newCellIndex].filled) {
                return false;
            }
        }
        return true;
    };

    const changeSquare = (rowIndex, cellIndex, newStatus) => {
        setBoard((prevBoard) =>
            prevBoard.map((row, i) => {
                if (i === rowIndex) {
                    return row.map((cell, j) => {
                        if (j === cellIndex) {
                            return { ...cell, filled: newStatus };
                        } else {
                            return cell;
                        }
                    });
                } else {
                    return row;
                }
            })
        );
    };

    function fillBoard(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                let obj = {
                    filled: false,
                    right: false,
                    left: false,
                    top: false,
                    bottom: false,
                };
                arr[i][j] = obj;
            }
        }
        return arr;
    }

    const addPieceToBoard = (piece) => {
        const newBoard = JSON.parse(JSON.stringify(board));
        const activeSquares = [];
        for (let i = 0; i < piece.length; i++) {
            for (let j = 0; j < piece[i].length; j++) {
                if (piece[i][j] === 1) {
                    newBoard[i][j + 4] = { ...newBoard[i][j + 4], filled: true };
                    activeSquares.push([i, j + 4]);
                }
            }
        }
        setActiveSquares(activeSquares);
        return newBoard;
    };

    useEffect(() => {
        if (!pieceActive) {
            setBoard(addPieceToBoard(piece));
            setPieceActive(true);
        }
    }, [piece, pieceActive]);

    useEffect(() => {
        const movePieceDown = () => {
            const newSquares = activeSquares.map(([rowIndex, cellIndex]) => [rowIndex + 1, cellIndex]);
            if (canMovePiece(newSquares)) {
                const newBoard = JSON.parse(JSON.stringify(board));
                for (let i = 0; i < activeSquares.length; i++) {
                    const [rowIndex, cellIndex] = activeSquares[i];
                    newBoard[rowIndex][cellIndex].filled = false;
                }
                for (let i = 0; i < newSquares.length; i++) {
                    const [rowIndex, cellIndex] = newSquares[i];
                    newBoard[rowIndex][cellIndex].filled = true;
                }
                setBoard(newBoard);
                setActiveSquares(newSquares);
            } else {
                setPiece(pieces[Math.floor(Math.random() * pieces.length)]);
                setPieceActive(false);
            }
        };

        const intervalId = setInterval(movePieceDown, 1000);

        return () => clearInterval(intervalId);
    }, [pieceActive, activeSquares, board]);

    return (
        <GeneratePieceContext.Provider
            value={{
                piece,
                setPiece,
                board,
                setBoard,
                changeSquare,
                fillBoard,
            }}
        >
            {children}
        </GeneratePieceContext.Provider>
    );
};

export default GeneratePieceContext;






