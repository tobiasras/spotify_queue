import MusicPlayer from "./Parts/MusicPlayer";
import SpotifyAuth from "./Parts/SpotifyAuth";

const AdminPanel = () => {
    return (
        <div className="">
            <div className="mb-5 text-gray-400">
                <h1 className="text-3xl font-bold" >Admin page</h1>
                <p>
                    A web page to controll the guldbar playlist
                </p>
            </div>

            <div className="mt-4">
                <MusicPlayer/>
            </div>

            <div className="mt-4">
                <SpotifyAuth/>
            </div>
        </div>
    )
}



export default AdminPanel