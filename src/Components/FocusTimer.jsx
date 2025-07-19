import { useState, useEffect } from 'react'
import '../Styles/FocusTimer.css'

const FocusTimer = () => {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [button, toggleButton] = useState('Start')
    const [run, toggleRun] = useState(false)
    const [breakTime, setBreakTime] = useState(1)
    const [focusTime, setFocusTime] = useState(1)
    const [mode, setMode] = useState('Focus')

    const updateTimer = () => {
        if (button === "Start") {
            toggleButton("Pause")
            toggleRun(true)
        }
        else {
            toggleButton("Start")
            toggleRun(false)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setSecond(prev => prev + 1)
        }, 1000);

        if (!run) {
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer)
        }
    }, [run])

    // Update minute on passing 60 seconds
    useEffect(() => {
        if (second === 5) {
            setMinute(prev => prev + 1)
            setSecond(0)
        }
    }, [second])

    // Handle completion of Timer
    useEffect(() => {
        if (mode === 'Focus') {
            if (minute === Number(focusTime)) {
                setSecond(0)
                setMinute(0)
                setMode('Break')
            }
        }
        else {
            if (minute === Number(breakTime)) {
                setSecond(0)
                setMinute(0)
                toggleRun(false)
                setMode('Focus')
                toggleButton("Start")
            }
        }

    }, [minute])

    // Change Modes on completion of Timer

    return (
        <>
            <div id="main-container">
                <h1 id='heading'>{mode}</h1>
                <div id='timer'>
                    {minute}:{second}
                </div>
                <div id='timer-buttons-div'>
                    <button onClick={updateTimer}>{button}</button>
                    <button onClick={() => { toggleRun(false); setSecond(0); setMinute(0); toggleButton("Start") }}>Reset</button>
                    <button onClick={() => { document.getElementById('timer-settings-dialog').showModal() }}>Settings</button>
                </div>
            </div>

            <dialog id="timer-settings-dialog">
                <h1>Settings</h1>
                <form>
                    <div>
                        <label htmlFor="focus-timer-input">Focus Timer</label>
                        <input type="number" id="focus-timer-input" value={focusTime} onChange={(e) => { setFocusTime(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="break-time">Break</label>
                        <input type="number" id="break-timer" value={breakTime} onChange={(e) => { setBreakTime(e.target.value) }} required />
                    </div>

                    <div id='form-buttons'>
                        <button id="cancel-form" onClick={(e) => { e.preventDefault(); document.getElementById('timer-settings-dialog').close() }}>Cancel</button>
                        <button id="submit-form" onClick={(e) => { e.preventDefault(); document.getElementById('timer-settings-dialog').close() }}>Submit</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

export default FocusTimer