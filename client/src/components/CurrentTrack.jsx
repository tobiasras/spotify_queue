import React, { useState, useEffect } from "react";
import { Track } from "../components/Track"

export const CurrentTrack = () => {
    const [state, setState] = useState({});

    useEffect(()=> {
        async function getState() {
            const promise = await fetch("http://localhost:8080/player/state", {
                method: "GET"
            });
            const response = await promise.json();
            setState(response)
        }
        getState();
    }, [])
    
    return (
        <>
            {/* {state ? <Track key={state.id} {...state.track} /> : null} */}
            <Track key={state.id} {...state.track} />
        </>
    )
}