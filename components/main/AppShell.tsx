import { useReducer } from "react";

import { NavMenu } from "@/lib/types";
import { initialWebState, webStateReducer, terminalStateReducer, initialTerminalState } from "@/lib/reducer/";
import { WebLayout, NavBar, Sidebar, Terminal, Helpbar, Footer } from "@/components/main";
import { useTerminalActions } from "@/lib/terminal";


export function AppShell () {
    
    const [webState, dispatchWebState] = useReducer(webStateReducer, initialWebState)
    const [terminalState, dispatchTerminalState] = useReducer(terminalStateReducer, initialTerminalState)

    const {
        handleCommand
    } = useTerminalActions(dispatchTerminalState)

    const NavMenuList: {type: NavMenu, label: string}[] = [
        { type: "about", label: "_about" },
        { type: "projects", label: "_projects" },
        { type: "skills", label: "_skills" },
        { type: "experience", label: "_experience" },
        { type: "contact", label: "_contact" },
        { type: "help", label: "_help" },
    ]

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