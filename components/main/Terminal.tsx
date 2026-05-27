import { TerminalState, TerminalAction } from "@/lib/types";
import { TerminalInput, TerminalOutput } from "../terminal";

type TerminalProps = {
    disabled: boolean,
    terminal: TerminalState,
    onCommand: (command: string) => void,
    dispatch: React.Dispatch<TerminalAction>,
}

export function Terminal({
    disabled, terminal,
    onCommand, dispatch
} :TerminalProps){

    

    return (
        <div className="flex flex-col min-w-0 flex-1 border main-border-color rounded-lg">
            <TerminalOutput
                entries={terminal.terminalLines}
            />
            <TerminalInput
                disabled={disabled}
                curr_path={terminal.curr_path}
                commandHistory={terminal.commandHistory}
                onCommand={onCommand}
                onSuggestions={(suggestions) => {
                    dispatch({
                        type: "ADD_TERMINAL_LINES",
                        value: [
                        {
                            type: "list_of_files",
                            content: { folders: [], files: suggestions }
                        }
                        ]
                    })
                }}
            />
        </div>
    )
}