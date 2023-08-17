import React from "react";

export const Track = (props) => {

    return (
        <>
            <article id={`stackId${props.id}`} className="flex p-4 gap-4 w-full overflow-x-scroll cursor-pointer">
                <img src={props.images?.[0]?.url} alt={props.name} className="w-16 h-16" />
                <div className="flex flex-col justify-between">
                    <h4 className="text-xl whitespace-nowrap">{props.name}</h4>
                    <div className="flex gap-4 whitespace-nowrap">
                        {props.artists?.map(((artist)=> (
                            <p key={artist.id} className="text-lg text-gray-400">{artist.name}</p>
                        )))}
                    </div>
                </div>
                {/* <p className="text-lg ml-auto text-gray-400">{"42:69"}</p> */}
            </article>
        </>
    )
}
