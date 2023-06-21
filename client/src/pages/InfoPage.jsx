import {Link} from "react-router-dom";

const InfoPage = () => {
    return (
        <div className="">
            <main className="w-full p-3">
                <div className="mb-5 text-gray-400">
                    <h1 className="text-3xl font-bold">Info page</h1>
                    <p>
                        A web page to controlling the Guldbar playlist
                    </p>

                    <p className="mt-2 font-bold flex flex-col">Created by:</p>
                    <ul>
                        <li className="hover:underline"><a href="https://github.com/tobiasras">@Tobiasras | Tobias Juul Rasmussen</a></li>
                        <li className="hover:underline"><a href="https://github.com/Breelef">@Breelef | Emil Breilev Vinther</a></li>
                        <li className="hover:underline"><a href="https://github.com/magn902m">@Magn902m | Magnus Nielsen</a></li>
                    </ul>
                </div>

                <div className="flex justify-center">
                    <Link className="w-full bg-neutral-900 rounded" to="/admin">
                        <p className="p-3 text-gray-500 font-medium text-center">
                            Admin page
                        </p>
                    </Link>
                </div>
            </main>

        </div>
    )
}

export default InfoPage