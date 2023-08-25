import {useEffect, useState} from "react";


const SpotifyAuth = (props) => {
    const [loginName, setLoginName] = useState('not connected')
    const [spotifyAccountConnected, setSpotifyAccountConnected] = props.spotifyAccountConnectedUseState

    const logoutOfSpotify = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL

        fetch(`${serverUrl}/api/auth/logout`)

        setLoginName("not connected")
        setSpotifyAccountConnected(false)
    }

    const loginToSpotify = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        const response = await fetch(`${serverUrl}/api/auth/login`)
        const link = await response.json()
        window.location.replace(link.redirectLink);
    }

    const getConnectedSpotifyAccount = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        const response = fetch(`${serverUrl}/api/auth/state`)
        const result = await response

        if (!result.ok){
            return ""
        }

        return await result.json()
    }

    useEffect(() => {
        getConnectedSpotifyAccount().then(result => {
            const name = result.display_name

            if (name) {
                setLoginName(name)
                setSpotifyAccountConnected(true)
            }
        })

    }, [])

    return (
        <div>
            <div>
                <p className="text-neutral-400">Spotify account: </p>
                <p className="font-bold text-neutral-400 mb-3">{loginName}</p>
            </div>

            <div className="w-full rounded">
                {spotifyAccountConnected ?
                    <button type="button" onClick={logoutOfSpotify}
                            className="text-neutral-400 bg-neutral-800 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                        Remove spotify account
                    </button>
                    :
                    <button type="button" onClick={loginToSpotify}
                            className="text-neutral-400 bg-neutral-800 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">
                        Add spot. account
                    </button>
                }
            </div>
        </div>

    )
}
export default SpotifyAuth
