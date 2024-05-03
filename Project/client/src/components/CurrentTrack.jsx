import React, { useState, useEffect } from "react";
import { Track } from "../components/Track";

export const CurrentTrack = (props) => {
    const [track, setTrack] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    const socket = props.socket;

    useEffect(() => {
        socket.current.emit("loadPlayerState");

        socket.current.on("playerState", (data) => {
            setIsPlaying(data);
            socket.current.emit("loadCurrentSong");
        });

        socket.current.on("currentSong", (data) => {
            if (data !== null) {
                setTrack(data);
            }
        });
    }, [socket]);

    const noCurrentTrack = {
        id: "noCurrentTrack",
        images: [{ url: "/assets/images/white_square.svg" }],
        name: "No tracks is playing",
        artists: [{ id: "noArtistfound", name: "No Artist Found" }],
    };

    return (
        <>
            {isPlaying ? (
                <div className="rounded-lg hover:bg-neutral-700">
                    <Track key={track.id} {...track} />
                </div>
            ) : (
                <div className="rounded-lg hover:bg-neutral-700">
                    <Track key={noCurrentTrack.id} {...noCurrentTrack} />
                </div>
            )}
        </>
    );
};
