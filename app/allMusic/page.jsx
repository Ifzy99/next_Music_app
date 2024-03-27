"use client"
import Loader from "@/components/Loader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const AllMusic = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const audioPlayer = useRef(null);
  const progressTimer = useRef(null);

  useEffect(() => {
    axios
      .get("https://musicapi-19wk.onrender.com/music/myAPI")
      .then((response) => {
        console.log(response);
        setSongs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (audioPlayer.current) {
      if (currentSongIndex !== null && currentSongIndex >= 0 && currentSongIndex < songs.length) {
        audioPlayer.current.src = songs[currentSongIndex].songUrl;
        audioPlayer.current.load();
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [currentSongIndex]);

  const handlePlayButtonClick = (index) => {
    if (currentSongIndex === index) {
      // If the same song is clicked, pause it
      audioPlayer.current.pause();
      setCurrentSongIndex(null);
    } else {
      setCurrentSongIndex(index);
    }
  };

  const handleTimeUpdate = () => {
    // Update the progress bar dynamically
    const progress = (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="text-center mt-3">ALL SONGS</h3>
        {loading && <Loader />}
      </div>
      {songs.map((result, index) => (
        <div key={result.id} className="bg-gray-100 p-4 flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md w-80">
            <img src={result.songImage} alt="idk - Highvyn, Taylor Shin" className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50" />
            <h2 className="text-xl font-semibold text-center">{result.songTitle}</h2>
            <p className="text-gray-600 text-sm text-center">{result.artistName}</p>
            <div className="mt-6 flex justify-center items-center">
              <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => handlePlayButtonClick(index)}>
                <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
                    <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
                  </g>
                </svg>
              </button>
            </div>
            <div className="mt-6 bg-gray-200 h-2 rounded-full">
              <div id="progress-bar" className="bg-teal-500 h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>
      ))}
      <audio ref={audioPlayer} controls onTimeUpdate={handleTimeUpdate} />
    </div>
  );
}

export default AllMusic;