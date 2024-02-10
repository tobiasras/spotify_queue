import React, { useState, useEffect, useRef } from "react";
import { Search } from "../components/Searchbar";
import { Track } from "../components/Track";
import { Popup } from "../components/Popup";
import { io } from "socket.io-client";
import { BaseLayout } from "../layouts/BaseLayout";

const AddSongPage = () => {
    const [search, setSearch] = useState([]);
    const [timedPopup, setTimedPopup] = useState(false);
    const [setTrack] = useState();
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('/');

        // socketRef.current.on('connect', () => console.log(socketRef.current.id));

        socketRef.current.on("addedSongResponse", (data) => {
        });

        socketRef.current.on("addToQueue", (data) => {
            setTrack(data);
        });
    });

    const handleClick = (data) => {
        if (socketRef.current) {
            socketRef.current.emit("addSong", data); // whatever event you want to emit on button click
        }
        setTimedPopup(true);
    };

    return (
        <BaseLayout>
            <section>
                <h1 className="text-4xl font-semibold">Add a track</h1>
            </section>
            <section className="flex flex-col gap-4 relative">
                <Search search={search} setSearch={setSearch} />
                <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
                    <p>Added to queue</p>
                </Popup>

                

                {/* Add loading state */}
                <ul className="flex flex-col gap-4">
                    {search !== ""
                        ? search.map((trackInfo, index) => (
                              <li key={index} className="flex items-center justify-between gap-4 rounded-lg hover:bg-neutral-700">
                                  <Track {...trackInfo} />
                                  <button
                                      onClick={() => handleClick(trackInfo)}
                                      className="p-4 h-auto rounded-lg hover:text-neutral-900"
                                  >
                                      Add
                                  </button>
                              </li>
                          ))
                        : "Chould not get track"}
                </ul>
            </section>
        </BaseLayout>
    );
};

export default AddSongPage;
