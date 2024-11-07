import React from 'react';
import './App.css';

export default function SentenceWindow({ fullSentence,time }: { fullSentence: string, time:number }) {

  const han = /^[\p{sc=Han}]+$/u;

  function getKanjiSentence(sentense: string) {
    let result = ""
    for (let index = 0; index < sentense.length; index++) {
      const element = sentense[index];
      if (han.test(element)) {
        result = result + element;
      }
    }
    return result
  }

  const kanjiSentense: string = getKanjiSentence(fullSentence)

  const kanjiDisplayTime: number = 3000 //msec
  const intervalTime: number = 2000 //msec
  const fullDisplayTime: number = 15000 //msec
  
  let nowSentence = ""
  
  if (time < kanjiDisplayTime + intervalTime) {
    const letters: number = (time / kanjiDisplayTime) * kanjiSentense.length
    nowSentence = (kanjiSentense.slice(0, letters))
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
      nowSentence =(fullSentence.slice(0, letters) + getKanjiSentence(fullSentence.slice(letters)))
    }
  }

  return (
    <div>
      <div className='sample-box-01'>
        {nowSentence}<br />
      </div>
    </div>
  );

}