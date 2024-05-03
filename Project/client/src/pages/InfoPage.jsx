import {Link} from "react-router-dom";
import {BaseLayout} from "../layouts/BaseLayout";
import QRCode from "react-qr-code";

const InfoPage = () => {
  const currentLocation = new URL(window.location.href);

  return (
    <BaseLayout>

      <div className="mb-5 text-neutral-400">
        <h1 className="text-4xl font-semibold text-white">Info page</h1>

        <div className="w-full w-100 lg:w-1/2 mt-4">
          <h2 className="font-bold text-neutral-400 mb-3">link for this site</h2>
          <QRCode bgColor="#171717" value={currentLocation.origin}
                  fgColor="#FFFFFF" style={{height: "auto", maxWidth: "100%", width: "100%"}}
          />
        </div>

        <h2 className="mt-2 font-bold flex flex-col">Created by:</h2>
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
