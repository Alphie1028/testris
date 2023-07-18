import './App.css'
import React, { useContext, useState, useEffect } from 'react';
import ScoreContext from './context/ScoreContext';
import GeneratePieceContext from './context/GeneratePieceContext';
import emptyBlockImg from './assets/emptyBlock.jpg';
import filledBlockImg from './assets/block.jpg';

function App() {
  const { score, setScore } = useContext(ScoreContext);
  const { piece, setPiece, board, setBoard, changeSquare, fillBoard} = useContext(GeneratePieceContext);
  


  return (
    <>
      <h1 className="scoreTitle">SCORE</h1>
      <div className="scoreBoard">
        <div className="score">{score}</div>
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) =>
            <img key={`${rowIndex}${cellIndex}`} className="square" src={cell.filled ? filledBlockImg : emptyBlockImg} alt="block" />
          )
        )}
      </div>
    </>
  )
}

export default App



