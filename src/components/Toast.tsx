import { useEffect, useRef } from "react";
import SuccessIcon from "./icons/Success";
import ErrorIcon from "./icons/Error";
import useToast from "../hooks/toast";
import { ToastType } from "../lib/types";
import WarningIcon from "./icons/WarningIcon";

function Toast({ toast }: { toast: ToastType }) {
    const { deleteToast } = useToast();

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let innerTimeOutId: any;
        let timeOutId = setTimeout(() => {
            containerRef.current?.style.setProperty(
                "animation",
                "fadeOut 0.5s forwards"
            );
            innerTimeOutId = setTimeout(() => {
                deleteToast(toast.id);
            }, 500);
        }, 5000);
        let timeRemaining = 5000;
        let startTime = Date.now();
        const pauseTimer = () => {
            clearTimeout(timeOutId);
            timeRemaining -= Date.now() - startTime;
        };
        const resumeTimer = () => {
            startTime = Date.now();
            timeOutId = setTimeout(() => {
                containerRef.current?.style.setProperty(
                    "animation",
                    "fadeOut 0.5s forwards"
                );
                innerTimeOutId = setTimeout(() => {
                    deleteToast(toast.id);
                }, 500);
            }, timeRemaining);
        };
        if (containerRef.current) {
            containerRef.current.addEventListener("mouseenter", pauseTimer);
            containerRef.current.addEventListener("mouseleave", resumeTimer);
        }
        return () => {
            clearTimeout(timeOutId);
            clearTimeout(innerTimeOutId);
            if (containerRef.current) {
                containerRef.current.removeEventListener(
                    "mouseenter",
                    pauseTimer
                );
                containerRef.current.removeEventListener(
                    "mouseleave",
                    resumeTimer
                );
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={`toast ${toast.type}`}>
            {toast.type === "success" ? (
                <SuccessIcon color="#07f507" />
            ) : toast.type === "warning" ? (
                <WarningIcon color="#f5d107" />
            ) : (
                <ErrorIcon color="#f50707" />
            )}
            {toast.message}
            <span onClick={() => deleteToast(toast.id)}>X</span>
        </div>
    );
}

export default Toast;
