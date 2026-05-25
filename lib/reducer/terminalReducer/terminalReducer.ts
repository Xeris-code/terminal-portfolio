import { TerminalState, TerminalAction } from "@/lib/types";

function getHistoryLines (commandsHistory: string[]) {
    return commandsHistory.map((command, index) => ({left: `${index + 1}`, right: command}))
}

export function terminalStateReducer (state: TerminalState, action: TerminalAction): TerminalState {
    switch (action.type) {
        case "ADD_TERMINAL_LINES":
            return {...state, terminalLines: [...state.terminalLines, ...action.value]}
        case "ADD_COMMAND_HISTORY":
            return {...state, commandHistory: [...state.commandHistory, action.value]}
        case "PRINT_HISTORY":
            return {...state, terminalLines: [...state.terminalLines, { type: "table", content: { columns: getHistoryLines(state.commandHistory)}}]}
        case "CLEAR_TERMINAL":
            return {...state, terminalLines: []}
        default:
            return state
    }
}