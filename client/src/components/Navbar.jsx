import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="fixed bottom-0 z-50 w-full h-16 bg-neutral-800">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                <Link to="/"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-900 group">

                    <span
                        className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600 material-symbols-outlined">
                        home
                    </span>
                    <span
                        className="text-sm text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Queue</span>
                </Link>

                <Link to="/addSong"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-900 group">
                    <span
                        className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600 material-symbols-outlined">
                        playlist_add
                    </span>
                    <span
                        className="text-sm text-gray-500 group-hover:text-blue-600">add song</span>
                </Link>

                <Link to="/info"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-900 ">
                    <span
                        className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600 material-symbols-outlined">
                        info
                    </span>
                    <span
                        className="text-sm text-gray-500 group-hover:text-blue-600 ">info</span>
                </Link>
            </div>
        </nav>
    )
};

export default Navbar;