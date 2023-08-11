import React, {useState} from "react";

export const Search = (props) => {
    const [timer, setTimer] = useState(0)

    function getSearch(e) {
        clearTimeout(timer)
        setTimer(setTimeout(async function(){
            console.log("searching for tracks")
            const connSearch = await fetch(`http://localhost:8080/search/?q=${e}`, {
            method: "GET"
            });
            const dataSearch = await connSearch.json();
            props.setSearch(dataSearch)
        }, 1000))
    }

    return (
        <>
            <div className="sticky top-0 z-10 w-full py-1" id="searchfield_box">
                <div className="rounded-full bg-zinc-900 px-6 py-3 flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                    </svg>
                    <input onChange={(e) => getSearch(e.target.value)} type="text" name="search_track" id="" placeholder="Search Track" className="bg-inherit w-full" />
                </div>
                <div id="search_results" className="hidden w-full bg-zinc-800 h-32 rounded-lg mt-4"></div>
            </div>
        </>
    )
}

