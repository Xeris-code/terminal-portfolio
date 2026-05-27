import { useTerminalInput } from "@/lib/terminal";
import { useEffect, useRef, useState } from "react";

type TerminalInputProps = {
    disabled: boolean;
    curr_path: string;
    commandHistory: string[];
    onCommand: (command: string) => void;
    onSuggestions: (suggestions: string[]) => void;
}

export function TerminalInput ({
    disabled, curr_path, commandHistory,
    onCommand, onSuggestions
}: TerminalInputProps){

    const {
        input, setInput,
        setCurrentCommand,
        setHistoryIndex,
        handleKeyDown
    } = useTerminalInput(commandHistory, curr_path)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect (()=>{
        setHistoryIndex(commandHistory.length)
    }, [commandHistory.length])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className="border-t main-border-color text-[12px]">
                <div className="flex gap-2 px-3 p-5 select-none">
                    <span><span className="text-[#62FF86]">xeris</span>@portfolio<span className="text-[#5F6B61]">{curr_path}:~$</span></span>
                    <div onClick={() => inputRef.current?.focus()} className="relative flex flex-1 items-center">
                        <span className="whitespace-pre">{input}</span>
                        <span className="terminal-cursor">█</span>

                        <input
                            ref={inputRef}
                            disabled={disabled}
                            value={input}
                            className="absolute inset-0 opacity-0 cursor-text"
                            onKeyDown={(e) => handleKeyDown(e, onCommand, onSuggestions)}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setCurrentCommand(e.target.value)
                            }}
                        />
                    </div>
                </div>
        </div>
    )
}