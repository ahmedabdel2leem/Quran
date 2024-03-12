import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Quran() {
  const [quran, setQuran] = useState([])
  interface Verses {
    words:Words[]
  }
interface Words {
  audio_url:string,
  text:string
}
const onScroll = (e:any) =>{
    console.log(e.pageY)
}
// get the audio and texts
const getTheQuran= () =>{
  axios.get('https://api.quran.com/api/v4/verses/by_page/1?words=true&word_fields=text_uthmani').then(({data})=>{setQuran(data.verses);console.log(data.verses)}).catch(err=>console.log(err))
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
  let savingCurrencySound =   'https://verses.quran.com/' + audio;     
      const startTheAudio = new Audio(savingCurrencySound);
  currentAudio = startTheAudio

      currentAudio.play();
}
if(!quran)return <div>test</div>
  return <>
  <div className="container  pb-96">
    {quran.map((ayah:Verses,indx:number)=>{
      return <div key={indx} className='text-2xl  border-b py-7'>
      {ayah.words.map((word)=>{
       return <> 
         <span onClick={()=>startAudio(word.audio_url)}>{word.text}  </span>  
         
        
        </>
      })}
        </div>
    })}
  </div>
    </>
}
