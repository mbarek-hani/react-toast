export type ToastProviderPropsType = {
    children: React.ReactNode;
    position:
        | "top-left"
        | "top-right"
        | "top-center"
        | "bottom-left"
        | "bottom-right"
        | "bottom-center";
};

export type ToastType = {
    id: Date;
    message: string;
    type: "success" | "error" | "warning";
};

export type ContextType = {
    openToast: (message: string, type: "success" | "error") => void;
    deleteToast: (id: Date) => void;
};
