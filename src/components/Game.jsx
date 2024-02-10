import { useRef, useState } from "react"
import Cross from '../assets/cross.png';
import Circle from '../assets/circle.png';
import Navbar from "./Navbar/Navbar";

// This is an array which stores the data of each box...
let data = ["", "", "", "", "", "", "", "", ""]

const Game = () => {

  const [isGamePlay, setIsGamePlay] = useState(true)
  const [count, setCount] = useState(0)
  const [dark, setDark] = useState(false)

  let titleRef1 = useRef(null)
  let titleRef2 = useRef(null)

  // This are the state to make the boxes empty...
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)
  const box4 = useRef(null)
  const box5 = useRef(null)
  const box6 = useRef(null)
  const box7 = useRef(null)
  const box8 = useRef(null)
  const box9 = useRef(null)

  let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

  // This condition is creadted to show the images of cross or circle when user click on any box...
  const toggle = (e, index) => {
    if (!isGamePlay || data[index] !== '') {
      return;
    }
    if (isGamePlay && data[index] === '') {
      if (count % 2 === 0) {
        e.target.innerHTML = `<img src=${Cross} alt='Cross' />`
        data[index] = 'X'
        setCount(count + 1)
      } else {
        e.target.innerHTML = `<img src=${Circle} alt='Cross' />`
        data[index] = 'O'
        setCount(count + 1)
      }
    }
    checkWin()
  }

  // This condition checks that if anyone wins the game than it calls the won function...
  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[c])
      }
    }

    if (count === 8) {
      won('Tie')
    }
  }

  // This condition is created to show the result...
  const won = (winnerName) => {
    setIsGamePlay(false)
    setCount(0)
    if (winnerName === 'Tie') {
      titleRef1.current.innerHTML = `Game Over! - Its a tie.`
      titleRef2.current.innerHTML = `Game Over! - Its a tie.`
    } else if (winnerName === "X") {
      titleRef1.current.innerHTML = `Congratulations : <img src=${Cross} alt='Cross' /> Wins`
      titleRef2.current.innerHTML = `Congratulations : <img src=${Cross} alt='Cross' /> Wins`
    } else {
      titleRef1.current.innerHTML = `Congratulations : <img src=${Circle} alt='Cross' /> Wins`
      titleRef2.current.innerHTML = `Congratulations : <img src=${Circle} alt='Cross' /> Wins`
    }
  }

  // Reset button functionality...
  const resetGame = () => {
    setIsGamePlay(true)
    setCount(0)
    data = ["", "", "", "", "", "", "", "", ""]
    titleRef1.current.innerHTML = `Tic-Tac-Toe In <span>REACT</span>`
    titleRef2.current.innerHTML = 'TIC TAC TOE'

    // This will make all the boxes empty... 
    boxArray.forEach((e) => {
      e.current.innerHTML = ''
    })
  }

  const toggleMode = () => {
    setDark(!dark)
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <Navbar toggleMode={toggleMode} />
      <div className="w-full h-screen flex items-center justify-center dark:bg-zinc-800 bg-slate-400 font-poppins duration-300">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-bold dark:text-slate-200 text-zinc-800 lg:text-[70px] sm:text-[40px] text-center hidden sm:flex items-center duration-300" ref={titleRef1} >Tic-Tac-Toe In <span className="ml-[15px]" >REACT</span></h1>
          <h1 className="font-bold dark:text-slate-200 text-zinc-800 text-[25px] text-center flex sm:hidden items-center duration-300" ref={titleRef2} >TIC TAC TOE</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div ref={box1} onClick={(e) => toggle(e, 0)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
              <div ref={box2} onClick={(e) => toggle(e, 1)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
              <div ref={box3} onClick={(e) => toggle(e, 2)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
            </div>
            <div className="flex gap-2">
              <div ref={box4} onClick={(e) => toggle(e, 3)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
              <div ref={box5} onClick={(e) => toggle(e, 4)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
              <div ref={box6} onClick={(e) => toggle(e, 5)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
            </div>
            <div className="flex gap-2">
              <div ref={box7} onClick={(e) => toggle(e, 6)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
              <div ref={box8} onClick={(e) => toggle(e, 7)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
              <div ref={box9} onClick={(e) => toggle(e, 8)} className="boxes duration-300 lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] dark:bg-slate-300 bg-zinc-800 rounded-md cursor-pointer flex items-center justify-center"></div>
            </div>
          </div>
          <button onClick={resetGame} className="dark:bg-slate-300 bg-zinc-800 text-slate-300 dark:text-zinc-800 sm:px-[35px] lg:px-[50px] px-[30px] sm:py-[15px] lg:py-[20px] py-[10px] mt-[10px] sm:text-[25px] lg:text-[35px] text-[20px] font-medium rounded-[6px] active:scale-95 duration-300 border-[2px] border-transparent hover:border-zinc-800 hover:dark:border-slate-300 hover:dark:bg-transparent hover:dark:text-slate-300 hover:bg-transparent hover:text-zinc-800" >Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Game