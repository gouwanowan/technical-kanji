import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const fullSentence = "「怪談『カーナビ』」、「ハードコア・シンドローム」、「初音ミクの消失」などの前後について、映画館で上映されていることを表す漢字三文字の言葉は何？"
  const [nowSentence, setNowSentence] = useState("")
  const han = /^[\p{sc=Han}]+$/u;

  function getKanjiSentense(sentense: string) {
    let result = ""
    for (let index = 0; index < sentense.length; index++) {
      const element = sentense[index];
      if (han.test(element)) {
        result = result + element;
      }
    }
    return result
  }

  const kanjiSentense: string = getKanjiSentense(fullSentence)

  const kanjiDisplayTime: number = 3000 //msec
  const intervalTime: number = 2000 //msec
  const fullDisplayTime: number = 15000 //msec
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

  useEffect(() => {
    if (time < kanjiDisplayTime + intervalTime) {
      const letters: number = (time / kanjiDisplayTime) * kanjiSentense.length
      setNowSentence(kanjiSentense.slice(0, letters))
    } else {
      if (time > kanjiDisplayTime + intervalTime) {
        const notKanjiNum = fullSentence.length - kanjiSentense.length
        const addLetters: number = ((time - kanjiDisplayTime - intervalTime) / fullDisplayTime) * notKanjiNum
        let letters: number = 0;
        let nowAddLetters: number = 0;
        for (let index = 0; index < fullSentence.length; index++) {
          if (nowAddLetters >= addLetters) {
            break;
          }
          const element = fullSentence[index];
          if (!han.test(element)) {
            nowAddLetters++
          }
          letters++
        }
        setNowSentence(fullSentence.slice(0, letters) + getKanjiSentense(fullSentence.slice(letters)))
      }
    }

  }, [time])

  return (
    <div className="App">
      <div className='App-header'>
        <div className='sample-box-01'>
          {nowSentence}<br />
        </div>
        {time / 1000}<br />
        <button onClick={() => { setIsRunning(!isRunning) }}>
          Button
        </button>
      </div>
    </div>
  );
}