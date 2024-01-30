"use client"

import { useEffect, useRef, useState } from "react"
import "../styles/audio.css"
// import axios from "axios"
import Head from "next/head"

    


const Audio = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState([]);
  const audioRef = useRef();

  useEffect(() => {
    // Fetch data from your API
    fetch('https://musicapi-19wk.onrender.com/music/myAPI')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.readyState >= 3) {
        audio.play();
      } else {
        audio.addEventListener('canplaythrough', () => {
          audio.play();
        }, { once: true });
      }
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const currentProgress = (audio.currentTime / audio.duration) * 100;
    setProgress(currentProgress);
  };



  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <ul>
        {isPlaying.map(item => (
          <li key={item.id}>
            <div className="audio-player">
              <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={item.songUrl} type="audio/mp3" />
              </audio>
              <div className="player-controls">
                <div className="play-pause-btn" onClick={handlePlayPause}>
                  <i className="fas fa-play"></i>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Audio