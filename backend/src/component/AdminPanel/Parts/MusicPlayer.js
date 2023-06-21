import {useEffect, useState} from "react";
import {playerFetch} from "./musicController";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        getState().then(state => setIsPlaying(state.is_playing))
    }, [])

    async function getState() {
        const promise = playerFetch("state", "GET");
        const response = await promise
        if (response.ok) {
            return await response.json()
        } else {
            console.log(response.status)
        }
    }

    const next = async () => {
        const promise = playerFetch("next", "POST");
        const response = await promise
        if (response.ok) {
        } else {
            alert(response.status)
        }
    }
    const previous = async () => {
        const promise = playerFetch("previous", "POST");
        const response = await promise
        if (response.ok) {
        } else {
            alert(response.status)
        }
    }
    const pause = async () => {
        const promise = playerFetch("pause", "PUT");
        const response = await promise
        if (response.ok) {
            setIsPlaying(false)
        } else {
            console.log(response.status)
        }
    }
    const play = async () => {
        const promise = playerFetch("play", "PUT");
        const response = await promise

        if (response.ok) {
            setIsPlaying(true)
        } else {
            alert(response.status)
        }
    }


    return (
        <div className="w-full bg-neutral-700 rounded flex justify-around p-3">
            <button type="button" onClick={previous}
                    className="text-gray-500 bg-neutral-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg pt-2 sm:w-auto px-5  text-center ">
                <span className="material-symbols-outlined p-0 m-0">
                    first_page
                </span>
            </button>


            {!isPlaying &&
                <button type="button" onClick={play}
                        className="text-gray-500 bg-neutral-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg pt-2 sm:w-auto px-5 text-center ">
                <span className="material-symbols-outlined p-0  m-0">
                    play_arrow
                </span>
                </button>
            }

            {isPlaying &&
                <button type="button" onClick={pause}
                        className="text-gray-500 bg-neutral-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg pt-2 sm:w-auto px-5 text-center ">
                <span className="material-symbols-outlined p-0  m-0">
                    pause
                </span>
                </button>
            }

            <button type="button" onClick={next}
                    className="text-gray-500 bg-neutral-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg pt-2 sm:w-auto px-5  text-center ">
                <span className="material-symbols-outlined p-0  m-0">
                     last_page
                </span>
            </button>
        </div>

    )
}
export default MusicPlayer