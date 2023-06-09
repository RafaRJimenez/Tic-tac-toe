import { useState } from 'react'
import confetti from "canvas-confetti"
import './App.css'
import { Square } from './components/Square'
import { TURNS} from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal} from './components/WinnerModal'

function App() {
  console.log('render')
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }
    
    )
    const [turn, setTurn] = useState(() => {
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? TURNS.X
    }
    )

    const [winner, setWinner] = useState(null)
    console.log(turn)
    

    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
      window.localStorage.removeItem('board')
      window.localStorage.removeItem('turn')
       }

       

    const updateBoard = (index) => {
      console.log(index)
      // if it is filled, don't write nothing
      if (board[index] || winner) return
      // update the board
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      // change turn
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
      //save game
      window.localStorage.setItem('board', JSON.stringify(newBoard))
      window.localStorage.setItem('turn', newTurn)
      // check if there is new winner
      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        setWinner(newWinner)
        confetti()
        console.log(newWinner)
        console.log(winner)
      } else if (checkEndGame(newBoard)) {
        console.log(newBoard)
        setWinner(false)
      }
    }

  return (
  <main className='board'>
    <h1>tic tac toe</h1>
    <button onClick={resetGame}>Reset del juego</button>
    <section className='game'>
      {
        board.map((square, index) => {
          return (
           <Square
           key={index}
           index={index}
           updateBoard={updateBoard}
           >
            {square}
           </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
  )
}

export default App
