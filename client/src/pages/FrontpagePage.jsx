import {Queue} from "../components/Queue";
import {CurrentTrack} from "../components/CurrentTrack";
import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";

const FrontpagePage = () => {
    const socketRef = useRef();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socketRef.current = io(`${process.env.REACT_APP_SERVER_URL}`);

        socketRef.current.on('connect', () => {
            setIsConnected(true);
        });


        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [])

    return (
        <div
            className="w-screen h-full overflow-x-hidden overflow-y-scroll grid grid-cols-[1fr_minmax(0,1000px)_1fr] items-center place-content-center bg-neutral-800 text-white">

            {isConnected ?
                <main className="flex flex-col col-[2/3] gap-4 p-4">


                        <>
                            <h2 className="text-3xl">Playing now</h2>

                            <section className="flex flex-col gap-4 bg-neutral-700 p-4 rounded-md">
                                <CurrentTrack socket={socketRef}/>
                            </section>
                        </>

                    <section className="flex flex-col gap-4 bg-neutral-700 p-4 rounded-md mt-14">
                        <h2 className="text-3xl mb-4">Current queue</h2>
                        <Queue socket={socketRef}/>
                    </section>
                </main>
                :
                <div>
                    <p>no connection</p>
                </div>
            }
        </div>
    )
}

export default FrontpagePage
