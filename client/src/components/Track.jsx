import React from "react";

export const Track = (props) => {

    return (
        <>
            <article id={`stackId${props.id}`} className="flex gap-4 items-center w-full">
                <img src={props.images?.[0]?.url} alt={props.name} className="w-16 min-w-[3rem] rounded-md" />
                <div>
                    <h4 className="text-xl">{props.name}</h4>
                    <div className="flex gap-4">
                        {props.artists?.map(((artist)=> (
                            <p key={artist.id} className="text-sm text-gray-400">{artist.name}</p>
                        )))}
                    </div>
                </div>
                {/* <p className="text-lg ml-auto text-gray-400">{"42:69"}</p> */}
            </article>
        </>
    )
}
