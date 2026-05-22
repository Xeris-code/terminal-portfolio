import { useReducer } from "react";

import { NavMenu } from "@/lib/types";
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
                return dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "error", content: {key: "Error", error: `Command '${command}' not recognized by the system. Use 'clear -help' for command list.`}}} ) 
                
            case "history":
                return (
                    terminalState.commandHistory.map((command, index) => (
                        dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "system", content: {line: `${index + 1 < 10 ? "0" : ""}${index + 1} : ${command}`}}} )
                    ))
                )
            default:
                return (
                    dispatchTerminalState( {type: "ADD_TERMINAL_LINE", value: {type: "error", content: {key: "Error", error: `Command '${command}' not recognized by the system. Use 'help' for command list.`}}} )
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