import ControlPanel from "./Parts/ControlPanel";
import SpotifyAuth from "./Parts/SpotifyAuth";
import {useState} from "react";

const AdminPanel = () => {

    const spotifyAccountConnectedUseState = useState(false)


    return (
        <div className="">

            <div className="mb-5 text-gray-400">
                <h1 className="text-3xl font-bold" >Admin page</h1>
                <p>
                    A web page to controll the guldbar playlist
                </p>
            </div>

            <div className="mt-4">
                <SpotifyAuth spotifyAccountConnectedUseState={spotifyAccountConnectedUseState} />
            </div>

            { spotifyAccountConnectedUseState[0] &&
                <div className="mt-4">
                    <ControlPanel/>
                </div>
            }
        </div>
    )
}
export default AdminPanel
