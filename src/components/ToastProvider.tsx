"use client";

import "react-toastify/dist/ReactToastify.css";
import { Flip, Slide, ToastContainer } from "react-toastify";

export default function ToastProvider(
    { children }: { children: React.ReactNode; }) {

    return (
        <>
            {children}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
                transition={Slide}
            />
        </>
    );
}
