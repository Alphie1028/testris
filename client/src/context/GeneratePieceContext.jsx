import React, { createContext, useState, useEffect} from "react";

const GeneratePieceContext = createContext();

export const GeneratePieceProvider = ({ children }) => {
    const [piece, setPiece] = useState(Math.floor(Math.random() * 7));
    let arr = Array.from({ length: 20 }, () => Array(10).fill(0));
    const emptyBoard = fillBoard(arr);
    const [board, setBoard] = useState(emptyBoard); 
    const [pieceActive, setPieceActive] = useState(false);
    
    const changeSquare = (rowIndex, cellIndex, newStatus) => {
        setBoard(prevBoard => {
            return prevBoard.map((row, i) => {
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
            });
        });
    }
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
    useEffect(() => {
        if (!pieceActive) {
            let num = Math.floor(Math.random() * 7);
            setPiece(num);
        }
    }, []);


    useEffect(() => {
        if(!pieceActive){
            //square
            if(piece === 0){
                changeSquare(0, 4, true);
                changeSquare(1, 4, true);
                changeSquare(0, 5, true);
                changeSquare(1, 5, true);  
            //line  
            }else if(piece === 1){
                changeSquare(0, 3, true);
                changeSquare(0, 4, true);
                changeSquare(0, 5, true);
                changeSquare(0, 6, true);
            //T
            }else if(piece === 2){
                changeSquare(0, 4, true);
                changeSquare(1, 3, true);
                changeSquare(1, 4, true);
                changeSquare(1, 5, true);
            //L 
            }else if(piece === 3){
                changeSquare(0, 4, true);
                changeSquare(1, 4, true);
                changeSquare(2, 4, true);
                changeSquare(2, 5, true);
            //L Flipped
            }else if(piece === 4){
                changeSquare(0, 5, true);
                changeSquare(1, 5, true);
                changeSquare(2, 5, true);
                changeSquare(2, 4, true);
            //Z
            }else if(piece === 5){
                changeSquare(0, 4, true);
                changeSquare(0, 5, true);
                changeSquare(1, 4, true);
                changeSquare(1, 3, true);
            //Z Flipped
            }else if(piece === 6){
                changeSquare(0, 4, true);
                changeSquare(0, 5, true);
                changeSquare(1, 5, true);
                changeSquare(1, 6, true);
            }
            else{
                console.log("Something went wrong creating the next piece.")
            } 
            setPieceActive(true);   
        }


    }, [piece, pieceActive]);

    return (<GeneratePieceContext.Provider value={{
        piece,
        setPiece, 
        board,
        setBoard,
        changeSquare, 
        fillBoard
    }}>
        {children}
    </GeneratePieceContext.Provider>
    )
}

export default GeneratePieceContext;