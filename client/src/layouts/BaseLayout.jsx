import React from "react";
import Navbar from "../components/Navbar";
import { ScrollToTop } from "../components/ScrollToTop";

export const BaseLayout = ({ children }) => {
    return (
        <>
            <div className="w-screen min-h-screen overflow-x-hidden overflow-y-scroll grid grid-cols-[1fr_minmax(0,1000px)_1fr] text-white">
                <main className="flex flex-col col-[2/3] gap-4 p-4">{children}</main>
            </div>
            <Navbar />
            <ScrollToTop />
        </>
    );
};
