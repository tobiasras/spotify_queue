import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {Track} from "../components/Track";
// import {socket} from "../socket";
import { io } from 'socket.io-client';

export const Queue = () => {
    const [queue, setQueue] = useState([]);

    const socketRef = useRef();

    useEffect(()=> {
        //const socketRef =
        socketRef.current = io('http://localhost:8080');

        socketRef.current.emit("loadQueue")

        socketRef.current.on('disconnect', ()  => console.log('server disconnected'))

        socketRef.current.on("queue", (data) => {
            console.log("loading queue data")
            setQueue(data)
        })
    }, [])



    return (
        <>
            {queue.message !== "Bad or expired token" ? (
                <ul className="flex flex-col gap-8">
                {queue !== "" ? queue.map((trackInfo) => (
                    <li className="flex items-center gap-4 bg-neutral-600 p-4 rounded-md">
                        <Track key={trackInfo.id} {...trackInfo} />
                        {/* <div className="flex items-center gap-2">
                            <p className="text-center font-black">12</p>
                            <div className="flex flex-col gap-2">
                                <button className="py-[0.4rem] px-3 hover:bg-neutral-800 rounded-full">&uarr;</button>
                                <button className="py-[0.4rem] px-3 hover:bg-neutral-800 rounded-full">&darr;</button>
                            </div>
                        </div> */}
                    </li>
                )) : "Chould not get track"}
                </ul>) :
                (<ul className="">
                    You need to <Link to="/admin" className="underline">login</Link>
                </ul>)
            }
        </>
    )
}
