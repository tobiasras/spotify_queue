import Navbar from "../../component/Navbar";
import {Link} from "react-router-dom";

const InfoPage = () => {
    return (
        <div className="">
            <main className="w-full p-3">
                <div className="mb-5 text-gray-400">
                    <h1 className="text-3xl font-bold"> Info page</h1>
                    <p>
                        A web page to controll the guldbar playlist
                    </p>

                    <p className="mt-2 font-bold">Created by:</p>
                        <p>@Tobiasras | Tobias Juul Rasmussen</p>
                        <p>@Breelef | Emil Breilev Vinther</p>
                        <p>@Magn902m | Magnus Nielsen</p>
                </div>

                <div className="flex justify-center">
                    <Link className="w-full bg-neutral-900 rounded" to="/admin">
                        <p className="p-3 text-gray-500 font-medium text-center">
                            Admin page
                        </p>
                    </Link>
                </div>
            </main>

            <Navbar/>
        </div>
)
}



export default InfoPage