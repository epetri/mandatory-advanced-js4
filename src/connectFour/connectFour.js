import React, { useReducer, setState } from 'react';
import Grid from './grid';
import { Helmet } from "react-helmet";
import './connectFour.css';


const grid = Array(6)
  .fill(null)
  .map(_ => Array(7).fill('white'));

let form = (a,b,c,d) => {     
  return(
    a !== 'white' && a === b && a === c && a === d
  )
}

function calculateWinner(grid){
    // check column
    for(let row = 0; row < 3; row++){
      for(let column = 0; column < 7; column++){
      if(form(
        grid[row][column], 
        grid[row+1][column],
        grid[row+2][column],
        grid[row+3][column]
      )){
        return grid[row][column]
        }
      }
    }

      //check row
      for(let row = 0; row < 6; row++){
        for(let column = 0; column < 4; column++){
          if(form(
            grid[row][column],
            grid[row][column+1],
            grid[row][column+2],
            grid[row][column+3]
          )){
            return grid[row][column]
          }
        }
      }

    //check down right
    for(let row = 0; row < 3; row++){
      for(let column = 0; column < 4; column++){
        if(form(
          grid[row][column],
          grid[row+1][column+1],
          grid[row+2][column+2],
          grid[row+3][column+3]
        )){
          return grid[row][column]
        }
      }
    }

    // check down left
    for(let row = 3; row < 6; row++){
      for(let column = 0; column < 4; column++){
        if(form(
          grid[row][column],
          grid[row-1][column+1],
          grid[row-2][column+2],
          grid[row-3][column+3]
        )){
          return grid[row][column]
        }
      }
    }

    //check draw
    for(let row of grid){
      for(let column of row){
        if(column === "white"){
          console.log(column);
          return ""
        }
      }
    }
    return "...it's a draw";

}

const reducer = (state, action) => {
  switch(action.type){

    case 'clearBoard':
    let clearBoard = Array(6)
    .fill(null)
    .map(_ => Array(7).fill('white'));
    return {
      ...state,
      cells: clearBoard, 
      winner: '',
    }

    case 'onClick':
      const newImage = [...state.cells];      
      for (let i = newImage.length-1; i >= 0; i --) {
        if (newImage[i][action.column] === 'white') {
          newImage[i][action.column] = state.color;

          const player = calculateWinner(newImage);
          return {
            ...state,
            cells: newImage,
            color: state.color === 'red' ? state.color = 'yellow' : state.color = 'red',
            winner: player,
          };
        }
      }

    return {
      ...state,
        cells: newImage,
    }

    default:
      throw new Error('nope!');
  }
}

const Board = () => {
    
  const [state, dispatch] = useReducer(reducer, {
    cells: grid,
    color: 'red',
    winner: '',
  })

  console.log(state.winner);
  
    return (
      <div className='gameDisp'>
        <Helmet>
          <title>ConnectFour</title>
        </Helmet>
        {state.winner ? <h1 style={{color: state.winner}}>Winner is {state.winner}</h1>: <h1>Connect 4</h1>} 
        <table className="App">
          <Grid cells={state.cells} onClick={(row, column) => {
            console.log(state.winner)
            if(state.winner === "" ){
              dispatch({type: 'onClick', row, column})
            }
        }}/>
        </table>
        <button className='resetBtn' onClick={()=> dispatch({type: 'clearBoard'})}>New game</button>
      </div>
    );
  }


export default Board;
