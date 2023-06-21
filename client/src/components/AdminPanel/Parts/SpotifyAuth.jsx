import {useEffect, useState} from "react";


const SpotifyAuth = () => {

    const [loginName, setLoginName] = useState('not connected')
    const authSpotify = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        const response = await fetch(`${serverUrl}/auth/login`)
        const link = await response.json()
        window.location.replace(link.redirectLink);
    }

    const getConnectedSpotifyAccount = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        const response = fetch(`${serverUrl}/auth/state`)
        const result = await response
        return await result.json()
    }

    useEffect(() => {
        getConnectedSpotifyAccount().then(promise => {
                const name = promise.display_name
                if (name) {
                    setLoginName(name)
                }
            }
        )
    }, [])

    return (
        <div>
            <div>
                <p className="text-gray-400 mb-2">Account: <span className="font-bold">{loginName}</span></p>
            </div>

            <div className="w-full rounded">
                <button type="button" onClick={authSpotify}
                        className="text-gray-500 bg-neutral-900 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">Login
                </button>
            </div>
        </div>

    )
}
export default SpotifyAuth