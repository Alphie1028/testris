import './App.css'
import React, {useContext} from 'react';
import ScoreContext from './context/ScoreContext';

function App() {
  const {score, setScore} = useContext(ScoreContext);
  const squares = new Array(200).fill(null);



  return (
    <>
      <h1 className="scoreTitle">SCORE</h1>
        <div className="scoreBoard">
          <div className="score">{score}</div>
        </div>
      <div className="board">
        {squares.map((value, index) => (
          <div key={index} className="square"></div>))}
      </div>
    </>
  )
}

export default App
