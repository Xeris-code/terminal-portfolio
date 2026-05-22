import { useEffect, useState } from "react";

type TerminalInputProps = {
    commandHistory: string[];
    onCommand: (command: string) => void;
}

export function TerminalInput ({
    commandHistory,
    onCommand
}: TerminalInputProps){

    const [input, setInput] = useState<string>("")  
    const [historyIndex, setHistoryIndex] = useState<number>(commandHistory.length)
    const [currentCommand, setCurrentCommand] = useState<string>("")

    function handleNextCommand(){
        if (commandHistory.length === 0){
            return
        };
        const newIndex = historyIndex + 1 > commandHistory.length ? commandHistory.length : historyIndex + 1
        setHistoryIndex(newIndex)
        if (newIndex === commandHistory.length){
            setInput(currentCommand)
        } else {
            setInput(commandHistory[newIndex])
        }
    }

    function handlePreviousCommand () {
        if (commandHistory.length === 0){
            return
        };
        const newIndex = historyIndex - 1 < 0 ? historyIndex : historyIndex - 1
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);

    }

    useEffect (()=>{
        setHistoryIndex(commandHistory.length)
    }, [commandHistory.length])

    return (
        <div className="border-t main-border-color text-[12px]">
                <div className="flex gap-2 px-3 p-5">
                    <span><span className="text-[#62FF86]">xeris</span>@portfolio<span className="text-[#5F6B61]">:~$</span></span>
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
                                setCurrentCommand("")
                            }
                            if (e.ctrlKey && e.key === "l") {
                                e.preventDefault()
                                setInput("")
                            }
                            if (e.key === "Tab"){
                                e.preventDefault()
                            }
                            if (e.key === "ArrowUp"){
                                e.preventDefault()
                                handlePreviousCommand()
                            }
                            if (e.key === "ArrowDown"){
                                e.preventDefault()
                                handleNextCommand()
                            }

                        }}
                        onChange={(e) => {setInput(e.target.value); setCurrentCommand(e.target.value)}}
                    />
                </div>
        </div>
    )
}