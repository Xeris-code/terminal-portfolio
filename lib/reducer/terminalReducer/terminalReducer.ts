import { TerminalState, TerminalAction } from "@/lib/types";

export function terminalStateReducer (state: TerminalState, action: TerminalAction): TerminalState {
    switch (action.type) {
        case "ADD_TERMINAL_LINE":
            return {...state, terminalLines: [...state.terminalLines, action.value]}
        case "ADD_COMMAND_HISTORY":
            return {...state, commandHistory: [...state.commandHistory, action.value]}
        case "CLEAR_TERMINAL":
            return {...state, terminalLines: []}
        default:
            return state
    }
}