"use client"

import axios from "axios";
import Image from "next/image";
import { useState } from "react"




const AllMusic = () => {
    const [song, setData] = useState([]);

    const getSongs = ()=>{
        axios.get("https://musicapi-19wk.onrender.com/music/myAPI")
        .then((res)=>{
           console.log(res);
           setData(res.data);
        })
        .catch((err)=>{
            console.log("err in getting resources");
        })
    }
  return (
    <>
      <div>
            <h3 className="text-center mt-3">API Fetch</h3>
            <button onClick={getSongs}>Check data</button>
      </div>
        {
            song.map((result)=>(
              <div key={result.id} >
                    <small>{result.id}</small>
                    <div className="p-3 my-3 border shadow-md drop-shadow-lg flex flex-row bg-stone-400 w-2/6">
                      <Image src={result.songImage}  width={100} height={100} blurDataURL="data" placeholder="blur" className="mx-3" alt="  "/>
                        <div className="">
                        <h1 className="font-bold">{result.songTitle}</h1> 
                         <h6>{result.artistName}</h6>
                         <audio controls>
                            <source  src={result.songUrl} type="audio/mpeg"/>
                       </audio>
                        </div>
                    </div>
              </div>
        ))
}
    </>
  )
}

export default AllMusic