import ControlPanel from "./Parts/ControlPanel";
import SpotifyAuth from "./Parts/SpotifyAuth";
import {useState} from "react";
import Toolbar from "./Parts/Toolbar";

const AdminPanel = () => {

    const spotifyAccountConnectedUseState = useState(false)


    return (
        <div className="">

            <div className="mb-5 text-neutral-400">
                <h1 className="text-4xl font-semibold text-white" >Admin page</h1>
                <p>
                    A web page to controll the guldbar playlist
                </p>
            </div>

            <div className="mt-4">
                <SpotifyAuth spotifyAccountConnectedUseState={spotifyAccountConnectedUseState} />
            </div>

            {spotifyAccountConnectedUseState[0] &&
                <>
                    <div className="mt-4">
                        <ControlPanel/>
                    </div>

                        <Toolbar />
                </>
            }
        </div>
    )
}
export default AdminPanel
