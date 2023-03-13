const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({children, updateboard, index}) => {
  return (
    <div className='square'>
      {children}
    </div>
  )
}

import './App.css'

function App() {
  const [board, setBoard] = Array(9).fill(null)
  return (
  <main className='board'>
    <h1>tic tac toe</h1>
    <section className='game'>
      {
        board.map((_, index) => {
          return (
           <Square
           key={index}
           index={index}
           >
            {index}
           </Square>
          )
        })
      }
    </section>
  </main>
  )
}

export default App
