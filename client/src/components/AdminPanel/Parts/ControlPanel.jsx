import React, {useEffect, useState} from "react";

const ControlPanel = (props) => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isToastShowing, setIsToastShowing] = useState(false)
    const [toast, setToast] = useState({type: "", text: ""})


    useEffect(() => {
        requestIsPlaying()
    }, [])

    async function requestIsPlaying() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/state`, {
                headers: {
                    authorization: `bearer ${sessionStorage.getItem("secret_key")}`
                }
            }
        )
        const body = await response.json()
        setIsPlaying(body.isPlaying)
    }

    const toastServerError = {
        type: "error",
        text: "server error"
    }

    async function startQueue() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/start`, {
            headers: {
                authorization: `bearer ${sessionStorage.getItem("secret_key")}`
            }
        })

        if (response.status === 204) {
            setIsPlaying(true)
            setToast(
                {
                    type: "success",
                    text: "Queue started"
                }
            )
            setIsToastShowing(true)
        } else {
            setToast(toastServerError)
            setIsToastShowing(true)
        }
    }

    async function skipSong() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/skip`, {
            headers: {
                authorization: `bearer ${sessionStorage.getItem("secret_key")}`
            }
        })

        if (response.status === 204) {
            setIsPlaying(true)
            setToast(
                {
                    type: "success",
                    text: "Skipped song"
                }
            )
            setIsToastShowing(true)
        } else {
            setToast(toastServerError)
            setIsToastShowing(true)
        }
    }

    async function stopQueue() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/queue/stop`, {
            headers: {
                authorization: `bearer ${sessionStorage.getItem("secret_key")}`
            }
        })
        console.log("stop queue, ", response)
        if (response.status === 204) {
            setIsPlaying(false)
            setToast(
                {
                    type: "success",
                    text: "Stopped queue"
                }
            )
            setIsToastShowing(true)
        } else {
            setToast(toastServerError)
            setIsToastShowing(true)
        }
    }


    return (
        <>
            <div className="w-full bg-neutral-700 rounded flex justify-between p-3">

                {!isPlaying ?
                    <button type="button" onClick={startQueue}
                            className="text-neutral-400 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                        Start queue
                    </button>
                    :
                    <>
                        <button type="button" onClick={stopQueue}
                                className="text-neutral-400 bg-neutral-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                            Stop queue
                        </button>

                        <button type="button" onClick={skipSong}
                                className="text-neutral-400 bg-neutral-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg pt-2 sm:w-auto px-5  text-center ">
                        <span className="material-symbols-outlined">
                            skip_next
                        </span>
                        </button>
                    </>
                }
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
export default ControlPanel

const Toast = (props) => {
    let textColor
    let borderColor

    switch (props.type) {
        case "error":
            textColor = "text-red-400"
            borderColor = "border-red-400"
            break;
        case "success":
            textColor = "text-green-400"
            borderColor = "border-green-400"
            break
        default:
            textColor = "text-gray-400"
            borderColor = "border-gray-400"
    }

    return (
        <div className={`${borderColor} border rounded p-3 text-center`}>
            <p className={`${textColor}`}>{props.text}</p>
        </div>

    )
}
