import React from "react";

export const Popup = (props) => {
    setTimeout(()=> {
        props.setTrigger(false)
    }, 3000)

    return (
        props.trigger && (
            <div className="popup fixed bottom-0 left-0 z-100 w-full h-screen flex justify-center items-end">
                <div className="inner-popup relative mb-[7rem] p-4 w-full max-w-[12rem] rounded-lg bg-sky-600 text-white text-center">
                    {props.children}
                </div>
            </div>
        )
    );
};
