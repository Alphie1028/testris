import './App.css'
import React, { useContext, useState, useEffect } from 'react';
import ScoreContext from './context/ScoreContext';
import emptyBlockImg from './assets/emptyBlock.jpg';

function App() {
  const { score, setScore } = useContext(ScoreContext);

  let arr = Array.from({ length: 20 }, () => Array(10).fill(0));

  function fillBoard(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        let obj = {
          filled: false,
          right: false,
          left: false,
          top: false,
          bottom: false,
        }
        arr[i][j] = obj;
      }
    } return arr;
  }

  const emptyBoard = fillBoard(arr);
  const [board, setBoard] = useState(emptyBoard);

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };

  return (
    <>
      <h1 className="scoreTitle">SCORE</h1>
      <div className="scoreBoard">
        <div className="score">{score}</div>
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) =>
            <img key={`${rowIndex}${cellIndex}`} className="square" src={emptyBlockImg} />
          )
        )}
      </div>
    </>
  )
}

export default App


