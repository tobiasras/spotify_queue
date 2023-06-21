import Navbar from "../components/Navbar";
import { Queue } from "../components/Queue";
import { CurrentTrack } from "../components/CurrentTrack";

const FrontpagePage = () => {

    return (
        <div className="w-screen h-full overflow-x-hidden overflow-y-scroll grid grid-cols-[1fr_minmax(0,1000px)_1fr] items-center place-content-center bg-neutral-800 text-white">
            <main className="flex flex-col col-[2/3] gap-4 p-4">
                <h2 className="text-3xl">Playing now</h2>
                <section className="flex flex-col gap-4 bg-neutral-700 p-4 rounded-md">
                    <CurrentTrack />
                </section>
                <section className="flex flex-col gap-4 bg-neutral-700 p-4 rounded-md mt-14">          
                    <h2 className="text-3xl mb-4">Current queue</h2>
                    <Queue/>
                </section>   

            </main>
            <Navbar/>
        </div>
    )
}

export default FrontpagePage