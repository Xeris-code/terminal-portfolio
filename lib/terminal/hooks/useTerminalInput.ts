import { useState } from "react"

export function useTerminalInput (commandHistory: string[]){

    const [input, setInput] = useState<string>("")  
    const [currentCommand, setCurrentCommand] = useState<string>("")
    const [historyIndex, setHistoryIndex] = useState<number>(commandHistory.length)

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        onCommand: (command: string) => void
    ) {

        function handleClearInput(){
            e.preventDefault()
            setInput("")
            setCurrentCommand("")
            setHistoryIndex(commandHistory.length)
        }

        function handleSubmit(){
            if (!input) {
                return   
            }
            e.preventDefault()
            onCommand(input)
            setInput("")
            setCurrentCommand("")
            setHistoryIndex(commandHistory.length)
        }

        function handleAutocompete(){
            e.preventDefault()
        }

        function handleNextCommand(){
            e.preventDefault()
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
            e.preventDefault()
            if (commandHistory.length === 0){
                return
            };
            const newIndex = historyIndex - 1 < 0 ? historyIndex : historyIndex - 1
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        }

        if (e.ctrlKey && e.key === "l"){
            handleClearInput()
            return
        }

        switch(e.key){
            case "Enter":
                handleSubmit()
                return
            case "Tab":
                handleAutocompete()
                return
            case "ArrowUp":
                handlePreviousCommand()
                return
            case "ArrowDown":
                handleNextCommand()
                return
        }               
    }

    return {
        input, setInput,
        setCurrentCommand,
        setHistoryIndex,
        handleKeyDown,
    }
}