// https://api.quran.com/api/v4/verses/by_key/2:3?words=true&word_fields=text_uthmani
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allQuranObj } from '../../store/allQuranSlice';

export default function QVerse() {
  const { isLoading, allQuran, error } = useSelector((state: any) => state.quran);
  const [first, setFirst] = useState([]);
  const [verseKeys, setVerseKeys] = useState([]);
  const [visibleVerses, setVisibleVerses] = useState(10); // Number of initially visible verses
  const dispatch = useDispatch();
  const verseContainerRef = useRef(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
    useEffect(() => {
    dispatch(allQuranObj());
  }, [dispatch]);

  useEffect(() => {
    if (allQuran) {
      const keys = allQuran
        .filter((verse) => verse.verse_key.startsWith(`${selectedChapter}:`))
        .slice(0, visibleVerses)
        .map((element: any) => element.verse_key);

      setVerseKeys(keys);
      getAllVerses(keys);
    }
  }, [allQuran, selectedChapter, visibleVerses]);

  useEffect(() => {
    const handleScroll = () => {
      const container = verseContainerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
  
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        const isNearBottom = scrollBottom < 800; // Adjust the threshold as needed
  console.log(scrollBottom)
        if (isNearBottom) {
          // Load more verses when near the bottom
          setVisibleVerses((prev) => prev + 10);
        }
      }
    };
  
    const container = verseContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visibleVerses]);

  async function getAllVerses(keys) {
    try {
      const responses = await Promise.all(
        keys.map((verse) =>
          axios.get(`https://api.quran.com/api/v4/verses/by_key/${verse}?words=true&audio=7&word_fields=text_uthmani`)
        )
      );

      const newarray = responses.map((response) => {
        const verseData = response?.data?.verse;
        if (verseData && verseData.words) {
          return verseData.words;
        }
        return null;
      });

      setFirst(newarray.filter((verse) => verse !== null));
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  }

    
    // if(versesId.length != 0){
    //     console.log('verseId',versesId)
    //     // versesId.map(verse=>getVerses(verse))
    //     // getVerses("94:1")
    // }

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
    if(isLoading)return <div>Loading...</div>
    if(error)return <div>errrors</div>
  return <>
 <div ref={verseContainerRef} style={{ overflowY: 'scroll', height: '100vh' , maxWidth:'100%'}}>
  {first.map((verse,indx)=>{
    return <div key={indx} className='  py-6 pb-10'>
        {verse.map((word,indx)=>[
          <span  onClick={()=>startAudio(word.audio_url)} key={indx}>{word.text_uthmani} </span>
        ])}
    </div>
  })}
  <button className=' bg-black text-white' onClick={()=>setSelectedChapter(prev=>prev+1)}>next surrah</button>
</div>
  </>
}
