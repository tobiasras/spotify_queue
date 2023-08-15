import React, { useState, useEffect } from "react";
import { Track } from "../components/Track"

export const CurrentTrack = (props) => {
    const [track, setTrack] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    const socketRef = props.socket

    useEffect(()=> {
        socketRef.current.emit('loadPlayerState')


        socketRef.current.on('playerState', (data) => {
            setIsPlaying(data)
            socketRef.current.emit("loadCurrentSong")
        });

        socketRef.current.on("currentSong", (data) => {
            if (data !== null){
                setTrack(data)
            }
        })

    }, [])

    return (
        <>
            {/* {state ? <Track key={state.id} {...state.track} /> : null} */}
            {
                isPlaying ? <Track key={track.id} {...track} />
                    :
                    <div>
                        <p>Spotify queuer is not playing</p>
                    </div>
            }
        </>
    )
}
