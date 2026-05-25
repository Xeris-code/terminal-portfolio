import { TerminalAction, TerminalEntry } from "@/lib/types";
import { helpLines, whoamiLines } from "../content";

function addToHistory (command: string): TerminalAction {
    return {type: "ADD_COMMAND_HISTORY", value: command}
}

function addToTerminal (entry: TerminalEntry[]): TerminalAction {
    return {type: "ADD_TERMINAL_LINES", value: entry}
}

function getSuccess (key: string, success: string): TerminalEntry {
    return {type: "success", content: {key: key, success: success}}
}

function getWarning (key: string, warning: string): TerminalEntry {
    return {type: "warning", content: {key: key, warning: warning}}
}

function getError (key: string, error: string): TerminalEntry {
    return {type: "error", content: {key: key, error: error}}
}

function getCommandList (command: string) {
    const commandList = command.trim().split(/\s+/)
    const multipleCommands = commandList.length > 1

    return {
        list: commandList,
        multiple: multipleCommands
    }
}

function filterCommand (command: string): TerminalAction {
    switch (command) {
        case "clear":
            return { type: "CLEAR_TERMINAL" }
        case "history":
            return { type: "PRINT_HISTORY" }
        case "help":
            return addToTerminal(helpLines)
        case "whoami":
            return addToTerminal(whoamiLines)
        default:
            return addToTerminal([
                getError(
                    "Error:", 
                    `'${command}': command not found`
                )
            ])
    }
}

export function useTerminalActions(dispatch: React.Dispatch<TerminalAction>){
    
    function handleCommand (command: string) {
        dispatch(
            addToTerminal([{
                type: "command", 
                content: {prompt: command}
            }])
        )
        dispatch(addToHistory(command))

        dispatch(filterCommand(command))
    }

    return {
        handleCommand
    }
}