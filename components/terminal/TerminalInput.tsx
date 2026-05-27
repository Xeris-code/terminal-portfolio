import { useTerminalInput } from "@/lib/terminal";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export type TerminalInputRef = {
    focus: () => void;
}

type TerminalInputProps = {
    disabled: boolean;
    curr_path: string;
    commandHistory: string[];
    onCommand: (command: string) => void;
    onSuggestions: (suggestions: string[]) => void;
}

export const TerminalInput = forwardRef<TerminalInputRef, TerminalInputProps>(
    function TerminalInput({
            disabled, curr_path, commandHistory,
            onCommand, onSuggestions
        }, 
        ref
    ){

        const {
            input, setInput,
            setCurrentCommand,
            setHistoryIndex,
            handleKeyDown
        } = useTerminalInput(commandHistory, curr_path)

        const inputRef = useRef<HTMLInputElement>(null)

        function focusInput() {
            inputRef.current?.focus()
        }

        useImperativeHandle(ref, () => ({
            focus: focusInput,
        }))

        useEffect (()=>{
            setHistoryIndex(commandHistory.length)
        }, [commandHistory.length, setHistoryIndex])

        useEffect(() => {
            focusInput()
        }, [])

        useEffect(() => {
        if (!disabled) {
            requestAnimationFrame(() => {
            focusInput();
            });
        }
        }, [disabled]);

        return (
            <div className="border-t main-border-color text-[12px]">
                    <div 
                        className="flex gap-2 px-3 p-5 select-none cursor-text"
                        onClick={focusInput}
                    >
                        <span>
                            <span className="text-[#62FF86]">xeris</span>@portfolio
                            <span className="text-[#5F6B61]">{curr_path}:~$</span>
                        </span>

                        <div className="relative flex flex-1 items-center">
                            <span className="whitespace-pre">{input}</span>
                            {!disabled && <span className="terminal-cursor">█</span>}

                            <input
                                ref={inputRef}
                                readOnly={disabled}
                                value={input}
                                className="absolute inset-0 opacity-0 cursor-text"
                                onKeyDown={(e) => {
                                    if (disabled) return;
                                    handleKeyDown(e, onCommand, onSuggestions);
                                    requestAnimationFrame(focusInput);
                                }}
                                onChange={(e) => {
                                    if (disabled) return;
                                    setInput(e.target.value);
                                    setCurrentCommand(e.target.value);
                                }}
                            />
                        </div>
                    </div>
            </div>
        )
    }
)