import React, { useState, useEffect, useRef } from "react";
import { Search } from "../components/Search";
import { Track } from "../components/Track";
import { io } from "socket.io-client";
import { BaseLayout } from "../layouts/BaseLayout";

const AddSongPage = () => {
    const [search, setSearch] = useState([]);
    const [track, setTrack] = useState();
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io("http://localhost:8080");

        // socketRef.current.on('connect', () => console.log(socketRef.current.id));

        socketRef.current.on("addedSongResponse", (data) => {
            console.log(data);
        });

        socketRef.current.on("addToQueue", (data) => {
            console.log(data);
            setTrack(data);
        });
    });

    const handleClick = (data) => {
        if (socketRef.current) {
            socketRef.current.emit("addSong", data); // whatever event you want to emit on button click
        }
    };

    return (
        <BaseLayout>
            <section className="flex flex-col">
                <h1 className="text-center text-4xl mb-4">Add a track</h1>
            </section>
            <section className="flex flex-col gap-8">
                <Search search={search} setSearch={setSearch} />
                <ul className="flex flex-col gap-8">
                    {search !== ""
                        ? search.map((trackInfo, index) => (
                              <li className="flex items-center justify-between gap-4">
                                  <Track key={index} {...trackInfo} />
                                  <button onClick={() => handleClick(trackInfo)}>Add</button>
                              </li>
                          ))
                        : "Chould not get track"}
                </ul>
            </section>
        </BaseLayout>
    );
};

export default AddSongPage;
