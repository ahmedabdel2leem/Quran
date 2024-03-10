import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Quran() {
  const [quran, setQuran] = useState([])
  interface Verses {
    words:Words[]
  }
interface Words {
  audio_url:string,
  text:string
}
// get the audio and texts
const getTheQuran= ()=>{
  axios.get('https://api.quran.com/api/v4/verses/by_page/3?words=true&word_fields=text_uthmani').then(({data})=>{setQuran(data.verses);console.log(data.verses)}).catch(err=>console.log(err))
}

useEffect(()=>{
  getTheQuran()
},[])
let currentAudio : HTMLAudioElement | null = null 
const startAudio = (audio:string)=>{
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0
  }
  var savingCurrencySound =   'https://verses.quran.com/' + audio;     
      const startTheAudio = new Audio(savingCurrencySound);
  currentAudio = startTheAudio

      startTheAudio.play();
}
if(!quran)return <div>test</div>
  return <>
    {quran.map((ayah:Verses,indx:number)=>{
      return <div className=''>
      {ayah.words.map((word)=>{
       return <> 
         <span onClick={()=>startAudio(word.audio_url)}>{word.text}  </span>  
         
        
        </>
      })}
        </div>
    })}
  
    </>
}
