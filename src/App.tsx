import React, { useState, useEffect } from 'react';
import './App.css';
import SentenceWindow from './SentenceWindow';

export default function App() {
  const fullSentence :string = "「怪談『カーナビ』」、「ハードコア・シンドローム」、「初音ミクの消失」などの前後について、映画館で上映されていることを表す漢字三文字の言葉は何？"
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
          const id = setInterval(() => {
            setTime(time + 10);
          }, 10);
          return () => clearInterval(id);
        }
      }, [isRunning, time]);

  return (
    <div className="App">
      <div className='App-header'>
        <SentenceWindow fullSentence={fullSentence} time={time}/>
        {time / 1000}<br />
        <button onClick={() => { setIsRunning(!isRunning) }}>
          Button
        </button>
      </div>
    </div>
  );
}