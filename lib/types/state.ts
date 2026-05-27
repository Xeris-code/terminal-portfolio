import { TerminalEntry } from "./terminal";

export type NavMenu = 
    | "about"
    | "skills"
    | "projects"
    | "experience"
    | "contact"
    | "help"
    | "whoami"

export type NavMenuList = {
    type: NavMenu,
    label: string,
    command: string[],
}[]

export type WebState = {
    activeMenu: NavMenu;
}

export type TerminalState = {
    terminalLines: TerminalEntry[];
    commandHistory: string[];
    curr_path: string;
    curr_file: string | null
}