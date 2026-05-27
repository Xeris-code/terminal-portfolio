import { useReducer } from "react";

import { NavMenu, NavMenuList } from "@/lib/types";
import { initialWebState, webStateReducer, terminalStateReducer, initialTerminalState } from "@/lib/reducer/";
import { WebLayout, NavBar, Sidebar, Terminal, Helpbar, Footer } from "@/components/main";
import { useTerminalActions, useBootSequence } from "@/lib/terminal";


export function AppShell () {
    
    const [webState, dispatchWebState] = useReducer(webStateReducer, initialWebState)
    const [terminalState, dispatchTerminalState] = useReducer(terminalStateReducer, initialTerminalState)

    const { isBooting } = useBootSequence(dispatchTerminalState)

    const {
        handleCommand
    } = useTerminalActions(terminalState, dispatchTerminalState)

    const NavMenuList: NavMenuList = [
        { type: "whoami", label: "_whoami", command: ["whoami"] },
        { type: "help", label: "_help", command: ["help"] },
        { type: "about", label: "_about", command: ["cat /about.txt"] },
        { type: "skills", label: "_skills", command: ["cd /skills"] },
        { type: "projects", label: "_projects", command: ["cd /projects"] },
        { type: "experience", label: "_experience", command: ["cat /experience.txt"] },
        { type: "contact", label: "_contact", command: ["cat /contact.txt"] },
    ]

    return (
        <WebLayout
            navbar={<NavBar
                disabled={isBooting}
                activeMenu={webState.activeMenu}
                menuList={NavMenuList}
                onMenuChange={(value: NavMenu) => dispatchWebState({ type: "SET_ACTIVE_NAV_MENU", value: value })}
                onClick={(command: string) => handleCommand(command)}
            />}
            sidebar={<Sidebar
                disabled={isBooting}
                curr_path={terminalState.curr_path}
                curr_file={terminalState.curr_file}
                onClick={(command: string) => handleCommand(command)}
            />}
            terminal={<Terminal
                disabled={isBooting}
                terminal={terminalState}
                onCommand={(command: string) => handleCommand(command)}
                dispatch={dispatchTerminalState}
            />}
            helpbar={<Helpbar/>}
            footer={<Footer/>}
        />
    )
}