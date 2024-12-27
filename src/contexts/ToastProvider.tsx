import { createContext, useState } from "react";
import "./toast.css";
import Toast from "../components/Toast";
import { ContextType, ToastProviderPropsType, ToastType } from "../lib/types";

export const toastContext = createContext<ContextType>({
    openToast: (_: string) => {},
    deleteToast: (_: Date) => {},
});

function ToastProvider({ children, position }: ToastProviderPropsType) {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    function openToast(
        message: string,
        type: "success" | "error" | "warning" = "success"
    ): void {
        let id = new Date();
        for (let i = toasts.length - 1; i >= 0; i--) {
            if (toasts[i].id == id) {
                id = new Date();
                break;
            }
        }
        const newToast = {
            id: id,
            message,
            type,
        };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    }

    function deleteToast(id: Date) {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    }

    return (
        <toastContext.Provider value={{ openToast, deleteToast }}>
            {children}
            <div className={`toasts ${position}`}>
                {toasts.map((toast) => (
                    <Toast key={toast.id.toString()} toast={toast} />
                ))}
            </div>
        </toastContext.Provider>
    );
}

export default ToastProvider;
