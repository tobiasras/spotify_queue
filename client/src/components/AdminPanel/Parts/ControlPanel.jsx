import {useEffect, useState} from "react";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(true)

    return (
        <div className="w-full bg-neutral-700 rounded flex justify-between p-3">

            {!isPlaying ?
                <button type="button"
                        className="text-gray-500 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                    Start queue
                </button>
                :
                <button type="button"
                        className="text-gray-500 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                    Stop queue
                </button>
            }


            <button type="button"
                    className="text-gray-500 bg-neutral-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg pt-2 sm:w-auto px-5  text-center ">
                <span className="material-symbols-outlined">
                     skip_next
                </span>
            </button>
        </div>

    )
}
export default MusicPlayer

