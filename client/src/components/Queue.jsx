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

        // socket.current.emit("loadQueue");
        // socket.current.on("queue", handleQueueUpdate);
        // return () => socket.current.off("queue", handleQueueUpdate);

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
                              <li key={index} className="flex items-center">
                                  <Track key={trackInfo.id} {...trackInfo} />
                                  {/* <div className="flex items-center gap-2">
                                      <p className="text-center font-black">12</p>
                                      <div className="flex flex-col gap-2">
                                          <button className="py-[0.4rem] px-3 hover:bg-neutral-800 rounded-full">
                                              &uarr;
                                          </button>
                                          <button className="py-[0.4rem] px-3 hover:bg-neutral-800 rounded-full">
                                              &darr;
                                          </button>
                                      </div>
                                  </div> */}
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
