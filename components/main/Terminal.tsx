import { useRef } from "react";
import { TerminalState, TerminalAction } from "@/lib/types";
import { TerminalInput, TerminalOutput, TerminalInputRef } from "../terminal";

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

    const inputRef = useRef<TerminalInputRef>(null)

    function focusInput() {
        requestAnimationFrame(() => {
            inputRef.current?.focus()
        })
    }

    return (
        <div 
            className="flex flex-col min-w-0 flex-1 border main-border-color rounded-lg"
            onClick={focusInput}
        >
            <TerminalOutput
                entries={terminal.terminalLines}
            />
            <TerminalInput
                disabled={disabled}
                curr_path={terminal.curr_path}
                commandHistory={terminal.commandHistory}
                onCommand={(command) => {onCommand(command); focusInput()}}
                onSuggestions={(suggestions) => {
                    dispatch({
                        type: "ADD_TERMINAL_LINES",
                        value: [
                        {
                            type: "list_of_files",
                            content: { folders: [], files: suggestions }
                        }
                        ]
                    });

                    focusInput();
                }}
            />
        </div>
    )
}