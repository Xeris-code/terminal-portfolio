import { useReducer } from "react";

import { NavMenu, TerminalEntry } from "@/lib/types";
import { initialWebState, webStateReducer, terminalStateReducer, initialTerminalState } from "@/lib/reducer/";
import { WebLayout, NavBar, Sidebar, Terminal, Helpbar, Footer } from "@/components/main";


export function AppShell () {
    
    const [webState, dispatchWebState] = useReducer(webStateReducer, initialWebState)
    const [terminalState, dispatchTerminalState] = useReducer(terminalStateReducer, initialTerminalState)

    const NavMenuList: {type: NavMenu, label: string}[] = [
        { type: "about", label: "_about" },
        { type: "projects", label: "_projects" },
        { type: "skills", label: "_skills" },
        { type: "experience", label: "_experience" },
        { type: "contact", label: "_contact" },
        { type: "help", label: "_help" },
    ]

    const helpLines:TerminalEntry[] = [
        {type: "system", content: {line: "Available commands:"}},
        {type: "empty_line", content: {count:1}},
        {type: "table", content: {columns: [
            {left: "help", right: "Show available commands"},
            {left: "whoami", right: "Display profile information"},
            {left: "ls", right: "List available files"},
            {left: "cat [file]", right: "Read a file"},
            {left: "history", right: "Show command history"},
            {left: "clear", right: "Clear terminal"},
        ]}},
        {type: "empty_line", content: {count:1}},
        {type: "table", content: {columns: [
            {left: "↑/↓", right: "Navigate command history"},
            {left: "tab", right: "Autocomplete commands"},
            {left: "ctrl+l", right: "Clear current line"},
        ]}},
    ]

    const whoamiList:TerminalEntry[] = [
        {type: "empty_line", content: {count:1}},
        {type: "table", content: {columns: [
            {left: "Name:", right: "Peter 'Xeris' Cisovsky"},
            {left: "Role:", right: "V&V Engineer for safety I&C systems in NPP"},
            {left: "Focus:", right: "Automation, UI systems, web apps"},
            {left: "Location:", right: "Slovakia"},
        ]}},
        {type: "empty_line", content: {count:1}},
        {type: "system", content: {line: "Currently building:"}},
        {type: "success", content: {key: "-", success: "Terminal Portfolio"}},
        {type: "success", content: {key: "-", success: "CV Maker"}},
        {type: "success", content: {key: "-", success: "FolderForge"}},
        {type: "empty_line", content: {count:1}},
        {type: "system", content: {line: "Interests:"}},
        {type: "success", content: {key: "-", success: "Clean UI/UX"}},
        {type: "success", content: {key: "-", success: "Terminal interfaces"}},
        {type: "success", content: {key: "-", success: "AI & automation"}},
        {type: "success", content: {key: "-", success: "Linux / dev tooling"}},
        {type: "empty_line", content: {count:1}},
        
    ]

    function handleCommand (command: string) {
        dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "command", content: {prompt: command}}} )
        dispatchTerminalState( {type: "ADD_COMMAND_HISTORY", value: command} )
        const commandList = command.split(" ")
        switch (commandList[0]) {
            case "clear":
                if (commandList.length === 1){
                    return (
                        dispatchTerminalState( {type: "CLEAR_TERMINAL"} )
                    )
                }
                return dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "error", content: {key: "Error:", error: `'${command}' command not found`}}} ) 
                
            case "history":
                return (
                    terminalState.commandHistory.map((command, index) => (
                        dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "table", content: {columns: [{left: `${index + 1}`, right: command}]}}} )
                    ))
                )

            case "help":
                return (
                    helpLines.map((line) => (
                        dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: line} )
                    ))
                )

            case "whoami":
                return (
                    whoamiList.map((line) => (
                        dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: line} )
                    ))
                )

            default:
                return (
                    dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "error", content: {key: "Error:", error: `'${command}': command not found`}}} )
                )
        }
    }

    return (
        <WebLayout
            navbar={<NavBar
                activeMenu={webState.activeMenu}
                menuList={NavMenuList}
                onMenuChange={(value: NavMenu) => dispatchWebState({ type: "SET_ACTIVE_NAV_MENU", value: value })}
            />}
            sidebar={<Sidebar/>}
            terminal={<Terminal
                terminal={terminalState}
                onCommand={(command: string) => handleCommand(command)}
            />}
            helpbar={<Helpbar/>}
            footer={<Footer/>}
        />
    )
}