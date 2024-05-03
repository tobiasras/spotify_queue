import React, {useEffect, useState} from "react";
import Toast from "./Toast";


const Toolbar = () => {

    const [isToastShowing, setIsToastShowing] = useState(false)
    const [toast, setToast] = useState({type: "", text: ""})

    async function clearQueue() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/clear`, {
            method: "GET",
            headers: {
                authorization: `bearer ${sessionStorage.getItem("secret_key")}`
            }
        })

        if (response.status === 204) {
            setToast(
                {
                    type: "success",
                    text: "Cleared spotify queue"
                }
            )
            setIsToastShowing(true)
        } else {
            setToast(
                {
                    type: "error",
                    text: `Failed clearing queue with code: ${response.status}`
                })
            setIsToastShowing(true)
        }
    }

    async function addSongToFallbackPlaylist() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/fallback`, {
            method: "POST",
            headers: {
                authorization: `bearer ${sessionStorage.getItem("secret_key")}`
            }
        })

        if (response.status === 204) {
            setToast(
                {
                    type: "success",
                    text: "Added song to fallback playlist"
                }
            )
            setIsToastShowing(true)
        } else {
            setToast(
                {
                    type: "error",
                    text: `Failed adding song to fallback playlist with code: ${response.status}`
                })
            setIsToastShowing(true)
        }
    }

    async function banCurrentSong() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/ban`, {
            method: "POST",
            headers: {
                authorization: `bearer ${sessionStorage.getItem("secret_key")}`
            }
        })

        if (response.status === 204) {
            setToast(
                {
                    type: "success",
                    text: "Banned current song"
                }
            )
            setIsToastShowing(true)
        } else {
            setToast(
                {
                    type: "error",
                    text: `Failed to ban song with statuscode: ${response.status}`
                })
            setIsToastShowing(true)
        }
    }



    return (
        <>
            <div className="w-full bg-neutral-700 rounded p-3 grid grid-cols-4 gap-3 ">

                <button type="button" onClick={addSongToFallbackPlaylist}
                        className="text-neutral-400 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                <span className="material-symbols-outlined">
                            playlist_add
                        </span>
                </button>

                <button type="button" onClick={clearQueue}
                        className="text-neutral-400 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                <span className="material-symbols-outlined">
                    contract_delete
                </span>
                </button>

                <button type="button" onClick={banCurrentSong}
                        className="text-neutral-400 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">

                <span className="material-symbols-outlined">
                  delete_forever
                </span>

                </button>
            </div>

            <div className="mt-4">
                {isToastShowing ?
                    <Toast type={toast.type} text={toast.text}> </Toast> :
                    <></>
                }
            </div>
        </>
    )


}

export default Toolbar