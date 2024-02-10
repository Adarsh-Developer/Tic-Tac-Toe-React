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
  const [chance, setChance] = useState('X')
  const [gameWinner, setGameWinner] = useState(null)

  const [winningBlocks, setWinningBlocks] = useState([]);

  let titleRef1 = useRef(null)

  // This are the state to make the boxes empty...
  const box0 = useRef(null)
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)
  const box4 = useRef(null)
  const box5 = useRef(null)
  const box6 = useRef(null)
  const box7 = useRef(null)
  const box8 = useRef(null)

  let boxArray = [box0, box1, box2, box3, box4, box5, box6, box7, box8]

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
        setChance('O')
      } else {
        e.target.innerHTML = `<img src=${Circle} alt='Cross' />`
        data[index] = 'O'
        setCount(count + 1)
        setChance('X')
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
        setTimeout(() => {
          setWinningBlocks([a])
        }, 0)
        setTimeout(() => {
          setWinningBlocks([a, b])
        }, 150)
        setTimeout(() => {
          setWinningBlocks([a, b, c])
        }, 300)
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
    } else if (winnerName === "X") {
      titleRef1.current.innerHTML = `Congratulations : <img src=${Cross} alt='Cross' /> Wins`
      setGameWinner('X')
    } else {
      titleRef1.current.innerHTML = `Congratulations : <img src=${Circle} alt='Cross' /> Wins`
      setGameWinner('O')
    }
  }

  // Reset button functionality...
  const resetGame = () => {
    setIsGamePlay(true)
    setCount(0)
    data = ["", "", "", "", "", "", "", "", ""]
    titleRef1.current.innerHTML = `TIC TAC TOE`

    setWinningBlocks([])
    setGameWinner(null)
    setChance('X')

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
          <h1 className="font-bold dark:bg-slate-300 bg-zinc-800 dark:text-zinc-800 text-slate-300 sm:px-[35px] lg:px-[35px] px-[15px] py-[8px] rounded-md sm:text-[30px] text-[22px] text-center flex items-center duration-300" ref={titleRef1} >TIC TAC TOE</h1>
          <div className="flex gap-10">
            <div className={`${gameWinner === 'X' ? 'bg-[#FFC226] text-[#27272A] dark:text-[#27272afa]' : ''} ${chance === 'X' && gameWinner === null ? 'dark:bg-slate-300 bg-zinc-800 dark:text-zinc-800 text-slate-300' : 'dark:border-slate-300 border-zinc-800 text-zinc-800 dark:text-slate-300'} select-none px-[30px] py-[10px] sm:text-[25px] sm:py-[10px] text-[20px] font-medium rounded-tr-[30px] rounded-bl-[30px] duration-300 border-[4px] border-transparent`} >Cross</div>
            <div className={`${gameWinner === 'O' ? 'bg-[#26FFCB] text-[#27272A] dark:text-[#27272afa]' : ''} ${chance === 'O' && gameWinner === null ? 'dark:bg-slate-300 bg-zinc-800 dark:text-zinc-800 text-slate-300' : 'dark:border-slate-300 border-zinc-800 text-zinc-800 dark:text-slate-300'} select-none px-[30px] py-[10px] sm:text-[25px] sm:py-[10px] text-[20px] font-medium rounded-tl-[30px] rounded-br-[30px] duration-300 border-[4px] border-transparent`} >Circle</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div ref={box0} onClick={(e) => toggle(e, 0)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(0) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
              <div ref={box1} onClick={(e) => toggle(e, 1)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(1) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
              <div ref={box2} onClick={(e) => toggle(e, 2)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(2) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
            </div>
            <div className="flex gap-2">
              <div ref={box3} onClick={(e) => toggle(e, 3)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(3) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
              <div ref={box4} onClick={(e) => toggle(e, 4)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(4) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
              <div ref={box5} onClick={(e) => toggle(e, 5)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(5) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
            </div>
            <div className="flex gap-2">
              <div ref={box6} onClick={(e) => toggle(e, 6)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(6) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
              <div ref={box7} onClick={(e) => toggle(e, 7)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(7) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
              <div ref={box8} onClick={(e) => toggle(e, 8)} className={`boxes duration-300 lg:w-[150px] lg:h-[150px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-md cursor-pointer flex items-center justify-center ${winningBlocks.includes(8) ? 'border-[5px] border-zinc-800 dark:border-slate-300' : 'dark:bg-slate-300 bg-zinc-800'}`}></div>
            </div>
          </div>
          <button onClick={resetGame} className="dark:bg-slate-300 bg-zinc-800 text-slate-300 dark:text-zinc-800 sm:px-[40px] px-[30px] sm:py-[15px] py-[10px] mt-[10px] sm:text-[25px] text-[20px] font-medium rounded-[6px] active:scale-95 duration-300 border-[2px] border-transparent hover:border-zinc-800 hover:dark:border-slate-300 hover:dark:bg-transparent hover:dark:text-slate-300 hover:bg-transparent hover:text-zinc-800" >Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Game