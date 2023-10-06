import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Track } from "./Track";

export const Queue = (props) => {
    const [queue, setQueue] = useState([]);

    const socket = props.socket;

    useEffect(() => {
        const handleQueueUpdate = (data) => {
            setQueue(data);
        };

        const socketCurr = socket.current

        socketCurr.emit("loadQueue");
        socketCurr.on("queue", handleQueueUpdate);

        return () => {
            socketCurr.off("queue", handleQueueUpdate); // Cleanup the listener
        };
    }, [socket]);

    return (
        <>
            {queue.message !== "Bad or expired token" ? (
                <ul className="flex flex-col gap-4">
                    {queue !== ""
                        ? queue.map((trackInfo, index) => (
                              <li key={index} className="flex items-center rounded-lg hover:bg-neutral-700">
                                  <Track key={trackInfo.id} {...trackInfo} />
                              </li>
                          ))
                        : "Chould not get track"}
                </ul>
            ) : (
                <ul className="">
                    You need to{" "}
                    <Link to="/admin" className="underline">
                        login
                    </Link>
                </ul>
            )}
        </>
    );
};
