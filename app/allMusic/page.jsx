"use client"

import Loader from "@/components/Loader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"




const AllMusic = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // const getSongs = ()=>{
    //     axios.get("https://musicapi-19wk.onrender.com/music/myAPI")
    //     .then((res)=>{
    //        console.log(res);
    //        setData(res.data);
    //     })
    //     .catch((err)=>{
    //         console.log("err in getting resources");
    //     })
    // }
  return (
    <>
      <div className="text-center">
            <h3 className="text-center mt-3">ALL SONGS</h3>
            {loading && <Loader/>}
      </div>
        {
            songs.map((result)=>(
              <div key={result.id} >
                    <small>{result.id}</small>
                    <div className="p-3 my-3 border shadow-md drop-shadow-lg flex flex-row bg-stone-400 w-2/6">
                      <Image src={result.songImage}  width={100} height={100} blurDataURL="data" placeholder="blur" className="mx-3" alt="API Images"  style={{ width: "100%", height: "auto" }}/>
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