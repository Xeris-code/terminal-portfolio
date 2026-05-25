import { NavMenu } from "./state";
import { TerminalEntry } from "./terminal";

export type WebStateAction = 
    | { type: "SET_ACTIVE_NAV_MENU", value: NavMenu }
    

export type TerminalAction =
    | { type: "ADD_TERMINAL_LINES", value: TerminalEntry[]} 
    | { type: "ADD_COMMAND_HISTORY", value: string}
    | { type: "PRINT_HISTORY"}
    | { type: "CLEAR_TERMINAL" }