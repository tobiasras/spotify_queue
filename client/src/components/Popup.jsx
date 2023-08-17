import React, { useEffect } from "react";

export const Popup = (props) => {
    setTimeout(()=> {
        props.setTrigger(false)
    }, 3000)

    return (
        props.trigger && (
            <div className="popup fixed bottom-0 left-0 z-100 w-full h-screen flex justify-center items-end">
                <div className="inner-popup relative mb-[7rem] p-4 w-full max-w-[12rem] rounded-lg bg-sky-600 text-white text-center">
                    {/* <button className="close-btn absolute top-4 rigth-4" onClick={() => props.trigger(false)}>
                        Close
                    </button> */}
                    {props.children}
                </div>
            </div>
        )
    );
};

// //* Show tip
// function showTip(message){
//     console.log(message)
//     const tip_id = Math.random()
//     let tip = `
//     <div data-tip-id="${tip_id}" class="flex justify-center w-full lg:w-1/3 mx-auto py-4 text-white bg-sky-600 rounded-md">
//       ${message}
//     </div>
//     `
//     document.querySelector("#tips").insertAdjacentHTML("afterbegin", tip)
//     setTimeout(function(){
//         document.querySelector(`[data-tip-id='${tip_id}']`).remove()
//     }, 3000)
//   }
