
// import { useState, useEffect } from "react"
// import '../Styles/FocusTimer.css'

// const FocusTimer = () => {
//     const [second, setSecond] = useState(0)
//     const [minute, setMinute] = useState(0)
//     const [run, toggleRun] = useState(false)
//     const [focusTime, setFocusTime] = useState()
//     const [breakTime, setBreakTime] = useState()

//     useEffect(() => {
//         if (second === 60) {
//             setSecond(0)
//             setMinute(prev => prev + 1)
//         }
//     }, [second])

//     useEffect(() => {
//         if (!run) { return }

//         const timer = setInterval(() => {
//             setSecond(prev => prev + 1)
//         }, 1000);

//         return () => {
//             clearInterval(timer)
//         }
//     }, [run])


//     return (
//         <div id="focus-timer">
//             <h1 id="heading">Focus Timer</h1>
//             <div id="timer">
//                 {minute}:{second}
//             </div>
//             <div id="timer-buttons-div">
//                 <button onClick={() => { toggleRun(true) }}>Start</button>
//                 <button onClick={() => { toggleRun(false) }}>Pause</button>
//                 <button onClick={() => { toggleRun(false); setSecond(0); setMinute(0) }}>Reset</button>
//                 <button onClick={() => {document.getElementById('settings-dialog').showModal()}}>Settings</button>
//             </div>
//             <dialog id="settings-dialog">
//                 <h1>Settings</h1>
//                 <form>
//                     <label htmlFor="focus-time">Focus Time</label>
//                     <input type="number" id="focus-time" value={focusTime} onChange={(e)=> {setFocusTime(e.target.value)}} />
//                     <label htmlFor="break-time">Break Time</label>
//                     <input type="number" id="break-time" value={breakTime} onChange={(e)=> {setBreakTime(e.target.value)}}/>
//                     <button onClick={(e) => {e.preventDefault();document.getElementById('settings-dialog').close()}}>Submit</button>
//                 </form>
//             </dialog>
//         </div>
//     )
// }

// export default FocusTimer

import { useState, useEffect } from 'react'
import '../Styles/FocusTimer.css'

const FocusTimer = () => {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [button, toggleButton] = useState('Start')
    const [run, toggleRun] = useState(false)

    const updateTimer = () => {
        if (button === "Start"){
            toggleButton("Pause")
            toggleRun(true)
        }
        else{
            toggleButton("Start")
            toggleRun(false)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setSecond(prev => prev+1)
        }, 1000);

        if (!run){
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer)
        }
    }, [run])

    useEffect(() => {
        if (second === 5){
            setMinute(prev => prev+1)
            setSecond(0)

            // for changing the number without looking like a glitch, setinterval for 950ms to change the minute 
            // and then clear the interval
        }
    }, [second])

    return(
        <div id="focus-timer">
            <h1 id='heading'>Focus Timer</h1>
            <div id='timer'>
                {minute}:{second}
            </div>
            <div id='timer-buttons-div'>
                <button onClick={updateTimer}>{button}</button>
                <button onClick={() => {toggleRun(false);setSecond(0);setMinute(0);toggleButton("Start")}}>Reset</button>
                <button>Settings</button>
            </div>
        </div>
    )
}

export default FocusTimer