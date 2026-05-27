import { TerminalState } from "@/lib/types";
import { TerminalInput, TerminalOutput } from "../terminal";

type TerminalProps = {
    terminal: TerminalState,
    onCommand: (command: string) => void,
}

export function Terminal({
    terminal,
    onCommand,
} :TerminalProps){

    

    return (
        <div className="flex flex-col min-w-0 flex-1 border main-border-color rounded-lg">
            <TerminalOutput
                entries={terminal.terminalLines}
            />
            <TerminalInput
                curr_path={terminal.curr_path}
                commandHistory={terminal.commandHistory}
                onCommand={onCommand}
            />
        </div>
    )
}