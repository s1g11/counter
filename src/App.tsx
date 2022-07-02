import React, {useEffect, useState} from 'react';
import {Counter} from "./components/Counter";
import {json} from "stream/consumers";

function App() {

    const [startCounter, setStartCounter] = useState(0)
    const [maxCounter, setMaxCounter] = useState(5)
    const [counter, setCounter] = useState(startCounter)

    return (
        <Counter
            counter={counter} setCounter={setCounter}
            startCount={startCounter} setStartCount={setStartCounter}
            maxCounter={maxCounter} setMaxCounter={setMaxCounter}/>
    );
}

export default App;