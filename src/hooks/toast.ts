import { toastContext } from "../contexts/ToastProvider";
import { useContext } from "react";

function useToast() {
    const { openToast, deleteToast } = useContext(toastContext);

    return { openToast, deleteToast };
}

export default useToast;
