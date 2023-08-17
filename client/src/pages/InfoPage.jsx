import { Link } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";

const InfoPage = () => {
    return (
        <BaseLayout>
            <div className="mb-5 text-neutral-400">
                <h1 className="text-3xl font-bold text-white">Info page</h1>
                <p>A web page to controlling the Guldbar playlist</p>

                <p className="mt-2 font-bold flex flex-col">Created by:</p>
                <ul>
                    <li className="hover:underline">
                        <a href="https://github.com/tobiasras">
                            @Tobiasras | Tobias Juul Rasmussen
                        </a>
                    </li>
                    <li className="hover:underline">
                        <a href="https://github.com/Breelef">@Breelef | Emil Breilev Vinther</a>
                    </li>
                    <li className="hover:underline">
                        <a href="https://github.com/magn902m">@Magn902m | Magnus Nielsen</a>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center">
                <Link className="w-full bg-neutral-800 rounded" to="/admin">
                    <p className="p-3 text-neutral-400 hover:text-white font-medium text-center">
                        Admin page
                    </p>
                </Link>
            </div>
        </BaseLayout>
    );
};

export default InfoPage;
