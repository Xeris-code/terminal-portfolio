import { useTerminalInput } from "@/lib/terminal";
import { useEffect, useState } from "react";

type TerminalInputProps = {
    curr_path: string;
    commandHistory: string[];
    onCommand: (command: string) => void;
}

export function TerminalInput ({
    curr_path,
    commandHistory,
    onCommand
}: TerminalInputProps){

    const {
        input, setInput,
        setCurrentCommand,
        setHistoryIndex,
        handleKeyDown
    } = useTerminalInput(commandHistory)

    useEffect (()=>{
        setHistoryIndex(commandHistory.length)
    }, [commandHistory.length])

    return (
        <div className="border-t main-border-color text-[12px]">
                <div className="flex gap-2 px-3 p-5">
                    <span><span className="text-[#62FF86]">xeris</span>@portfolio<span className="text-[#5F6B61]">{curr_path}:~$</span></span>
                    <input
                        value={input}
                        className="w-full focus:outline-none"
                        onKeyDown={(e) => handleKeyDown(e, onCommand)}
                        onChange={(e) => {setInput(e.target.value); setCurrentCommand(e.target.value)}}
                    />
                </div>
        </div>
    )
}