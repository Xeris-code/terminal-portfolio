import { TerminalEntry } from "./terminal";

export type NavMenu = 
    | "about"
    | "projects"
    | "skills"
    | "experience"
    | "contact"
    | "help"

export type NavMenuList = {
    type: NavMenu,
    label: string,
}[]

export type WebState = {
    activeMenu: NavMenu;
}

export type TerminalState = {
    terminalLines: TerminalEntry[];
    commandHistory: string[];
}