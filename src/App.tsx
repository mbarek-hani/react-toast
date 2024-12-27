import useToast from "./hooks/toast";
import { useState } from "react";
import "./App.css";

function App() {
    const { openToast } = useToast();
    const [input, setInput] = useState("");
    return (
        <>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => openToast(input, "success")}>
                show succes!
            </button>
            <button onClick={() => openToast(input, "error")}>
                show error!
            </button>
            <button onClick={() => openToast(input, "warning")}>
                show warning!
            </button>
        </>
    );
}

export default App;
