import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import s from "../App.module.css";
import {SuperInput} from "./SuperInput";
import {SuperButton} from "./SuperButton";
import {CounterMonitor} from "./CounterMonitor";

type CounterPropsType = {
    counter: number
    startCount: number
    maxCounter: number
    setCounter: (counter: number) => void
    setStartCount: (startCount: number) => void
    setMaxCounter: (maxCounter: number) => void
}

export const Counter: React.FC<CounterPropsType> = (
    {
        counter, startCount, maxCounter, setCounter, setStartCount, setMaxCounter
    }) => {
    const errorTypes = [
        {id: 1, message: ''},
        {id: 2, message: 'Enter values and press "Set"'},
        {id: 3, message: 'Incorrect values'}
    ]
    const [error, setError] = useState(errorTypes[0])

    useEffect(() => {
        let counterLS = localStorage.getItem('counter')
        counterLS && setCounter(JSON.parse(counterLS))

        let startCounterLS = localStorage.getItem('startCount')
        startCounterLS && setStartCount(JSON.parse(startCounterLS))

        let maxCounterLS = localStorage.getItem('maxCounter')
        maxCounterLS && setMaxCounter(JSON.parse(maxCounterLS))
    }, [])

    useEffect(()=> {
        localStorage.setItem('counter', JSON.stringify(counter))
        localStorage.setItem('startCount', JSON.stringify(startCount))
        localStorage.setItem('maxCounter', JSON.stringify(maxCounter))
        startCount >= 0 && startCount < maxCounter ? console.log() : setError(errorTypes[2])
    }, [counter, startCount, maxCounter])

    const changeStartCounter = (value: string) => {
        setCounter(+value)
        setStartCount(+value);
        +value >= 0 && +value < maxCounter ? setError(errorTypes[1]) : setError(errorTypes[2])
    }
    const changeMaxCounter = (value: string) => {
        setMaxCounter(+value);
        +value >= 0 && +value > startCount ? setError(errorTypes[1]) : setError(errorTypes[2])
    }
    const applySettings = () => {
        setError(errorTypes[0])
        setCounter(startCount)
    }

    const incCounter = () => setCounter(counter + 1)
    const resetCounter = () => setCounter(startCount)

    return (
        <div className={s.counterAppBlock}>

            <div className={s.counterBlock}>
                <div className={s.inputContainer}>
                    <p className={s.inputName}>Start counter value:</p>
                    <SuperInput callBack={changeStartCounter} value={startCount}
                                className={error.id === 3 ? `${s.superInputNumber} ${s.inputError}` : s.superInputNumber}
                                type={"number"}/>
                </div>

                <div  className={s.inputContainer}>
                    <p className={s.inputName}>Max counter value:</p>
                    <SuperInput callBack={changeMaxCounter} value={maxCounter}
                                className={error.id === 3 ? `${s.superInputNumber} ${s.inputError}` : s.superInputNumber}
                                type={"number"}/>
                </div>

                <SuperButton className={s.button} title={"SET"} callBack={applySettings} disabled={error.id !== 2}/>

            </div>

            <div className={s.counterBlock}>

                <div className={s.counterMonitorContainer}>
                    <CounterMonitor className={error.id === 3 ? `${s.monitorError} ${s.red}` : error.id === 2 ? s.monitorError : counter === maxCounter ? `${s.counter} ${s.red}` : s.counter}
                                    message={error.id !== 1 ? error.message : `${counter}`}/>
                </div>

                <div className={s.counterControlContainer}>
                    <SuperButton className={s.button} title={"INC"} callBack={incCounter}
                                 disabled={error.id !== 1 || counter === maxCounter}/>
                    <SuperButton className={s.button} title={"RESET"} callBack={resetCounter}
                                 disabled={error.id !== 1 || counter === startCount}/>
                </div>

            </div>

        </div>
    )
}