import { useState } from "react"
import { getSystemFileItems, fileSystem } from "../content";

type AutocompleteOptions = {
    input: string;
    commands: string[];
    files: string[];
    folders: string[];
};

type AutocompleteResult = {
    completed?: string;
    suggestions?: string[];
};
function getAutocomplete({
    input,
    commands,
    files,
    folders,
}: AutocompleteOptions): AutocompleteResult {
    const hasTrailingSpace = input.endsWith(" ");
    const parts = input.split(/\s+/);
    const command = parts[0] ?? "";
    const arg = hasTrailingSpace ? "" : parts[1] ?? "";

    if (!hasTrailingSpace && parts.length === 1) {
        const matches = commands.filter((cmd) => cmd.startsWith(command));

        if (matches.length === 1) return { completed: matches[0] };
        if (matches.length > 1) return { suggestions: matches };

        return {};
    }

    if (command === "cat") {
        const matches = [...files].filter((item) =>
        item.startsWith(arg)
        );

        if (matches.length === 1 && arg) return { completed: `cat ${matches[0]}` };
        if (matches.length > 0) return { suggestions: matches };
    }

    if (command === "cd") {
        const matches = folders.filter((folder) => folder.startsWith(arg));

        if (matches.length === 1 && arg) return { completed: `cd ${matches[0].slice(0,-1)}` };
        if (matches.length > 0) return { suggestions: matches.map(match => match.slice(0,-1)) };
    }

    return {};
}

export function useTerminalInput (commandHistory: string[], curr_path: string){

    const [input, setInput] = useState<string>("")  
    const [currentCommand, setCurrentCommand] = useState<string>("")
    const [historyIndex, setHistoryIndex] = useState<number>(commandHistory.length)

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        onCommand: (command: string) => void,
        onSuggestions: (suggestions: string[]) => void
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
            case "Tab": {
                e.preventDefault();

                const files: string[] = []
                const folders: string[] = []

                getSystemFileItems(
                    fileSystem,
                    curr_path === "/"
                        ? "/"
                        : curr_path.slice(0,-1)
                ).forEach((item) => {
                    if (item.type === "") {
                        folders.push(`${item.name}/`)
                    } else {
                        files.push(item.name)
                    }
                })

                const result = getAutocomplete({
                    input,
                    commands: [
                        "help",
                        "whoami",
                        "ls",
                        "cd",
                        "cat",
                        "history",
                        "clear"
                    ],
                    files,
                    folders,
                });

                if (result.completed) {
                    setInput(result.completed);
                    setCurrentCommand(result.completed);
                }

                if (result.suggestions?.length) {
                    onSuggestions(result.suggestions);
                }

                return;
            }
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