import React, {useState} from "react";
import Navbar from "../component/Navbar";
import { Search } from "../component/Search";
import { Track } from "../component/Track";

async function addQueue(trackId){
    const promise = fetch(`http://localhost:8080/queue/?uri=spotify:track:${trackId}`, {
        method: "POST"
    })
    const result = await promise
    switch(result.status){
        case 204:
            alert("Song added to queue")
            break
        case 404:
            alert("404 - Backend not logged in")
            break
        case 429:
            alert("429 - No more requests - wait for some time")
            break
        default:
            alert("ERROR")
    }
}

const AddSongPage = () => {
    const [search, setSearch] = useState([]);
        
    
    return (
        <div className="w-screen h-full overflow-x-hidden overflow-y-scroll grid grid-cols-[1fr_minmax(0,1000px)_1fr] items-center place-content-center bg-neutral-800 text-white">
            <main className="flex flex-col justify-center items-center col-[2/3] p-4">
                <section className="flex flex-col">          
                    <h1 className="text-center text-4xl mb-4">Add a track</h1>
                </section>   
                <section className="flex flex-col gap-8">
                    <Search search={search} setSearch={setSearch} />
                    <ul className="flex flex-col gap-8">
                        {search !== "" ? search.map((trackInfo) => (
                            <li className="flex items-center justify-between gap-4">
                                <Track key={trackInfo.id} {...trackInfo} />
                                <button onClick={() => addQueue(trackInfo.id)}>Add</button>
                            </li>
                        )) : "Chould not get track"}
                    </ul>
                </section>
            </main>
            <Navbar/>
            
        </div>
    )
}


export default AddSongPage