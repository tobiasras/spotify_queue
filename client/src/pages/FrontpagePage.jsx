import { Queue } from "../components/Queue";
import { CurrentTrack } from "../components/CurrentTrack";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { BaseLayout } from "../layouts/BaseLayout";

const FrontpagePage = () => {
    const socketRef = useRef();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socketRef.current = io("http://localhost:8080");

        socketRef.current.on("connect", () => {
            setIsConnected(true);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return (
        <BaseLayout>
            {isConnected ? (
                <>
                    <section className="bg-gradient-to-b from-yellow-500 to-neutral-800">
                        <h2 className="text-3xl">Playing now</h2>
                        <CurrentTrack socket={socketRef} />

                        {/* <section className="flex flex-col gap-4 bg-neutral-700 p-4 rounded-md">
                        </section> */}
                    </section>
                    <section className="flex flex-col gap-4 bg-neutral-700 p-4 rounded-md mt-14">
                        <h2 className="text-3xl mb-4">Current queue</h2>
                        <Queue socket={socketRef} />
                    </section>{" "}
                </>
            ) : (
                <div>
                    <p>no connection</p>
                </div>
            )}
        </BaseLayout>
    );
};

export default FrontpagePage;
