import { TerminalState } from "@/lib/types";
import { useState } from "react"
import { TerminalOutput } from "../terminal";

type TerminalProps = {
    terminal: TerminalState,
    onCommand: (command: string) => void,
}

export function Terminal({
    terminal,
    onCommand,
} :TerminalProps){

    const [input, setInput] = useState<string>("")

    return (
        <div className="flex flex-col flex-1 border main-border-color rounded-lg">
            <TerminalOutput
                entries={terminal.terminalLines}
            />
            <div className="border-t main-border-color text-[12px]">
                <div className="flex gap-2 px-3 p-5">
                    <span><span className="text-[#62FF86]">xeris</span>@portfolio:~$</span>
                    <input
                        value={input}
                        className="w-full focus:outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                if (!input) {
                                    return;
                                };
                                onCommand(input);
                                setInput("");
                            }
                            if (e.ctrlKey && e.key === "l") {
                                e.preventDefault()
                                setInput("")
                            }
                            if (e.key === "Tab"){
                                e.preventDefault()
                            }

                        }}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                
            </div>
        </div>
    )
}