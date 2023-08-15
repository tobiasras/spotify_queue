import React, { useState, useEffect} from "react";
import { Track } from "../components/Track"

export const CurrentTrack = (props) => {
    const [track, setTrack] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    const socket = props.socket

    useEffect(()=> {
        socket.current.emit('loadPlayerState')

        socket.current.on('playerState', (data) => {
            setIsPlaying(data)
            socket.current.emit("loadCurrentSong")
        });

        socket.current.on("currentSong", (data) => {
            if (data !== null){
                setTrack(data)
            }
        })
    }, [socket])

    return (
        <>
            {/* {state ? <Track key={state.id} {...state.track} /> : null} */}
            {
                isPlaying ? <Track key={track.id} {...track} />
                    :
                    <div className="text-center text-gray-300">
                        <p>Spotify queue is not playing</p>
                    </div>
            }
        </>
    )
}
