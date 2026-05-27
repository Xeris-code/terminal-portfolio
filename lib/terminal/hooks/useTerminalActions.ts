import { TerminalAction, TerminalEntry, TerminalState } from "@/lib/types";
import { fileSystem, getSystemFileItems, systemFilePaths, AvailableTextFileLines, availableFiles } from "../content";

function addToHistory (command: string): TerminalAction {
    return {type: "ADD_COMMAND_HISTORY", value: command}
}

function addToTerminal (entry: TerminalEntry[]): TerminalAction {
    return {type: "ADD_TERMINAL_LINES", value: entry}
}

function setCurrPath (path: string) : TerminalAction {
    return {type: "SET_CURR_PATH", value: path}
}

function getSuccess (key: string, success: string): TerminalEntry {
    return {type: "success", content: {key: key, success: success}}
}

function getWarning (key: string, warning: string): TerminalEntry {
    return {type: "warning", content: {key: key, warning: warning}}
}

function getError (key: string, error: string): TerminalEntry {
    return {type: "error", content: {key: key, error: error}}
}

function getCommandList (command: string) {
    const commandList = command.trim().split(/\s+/)

    return {
        name: commandList[0].trim(),
        args: commandList.slice(1)
    }
}

function checkPath ( path: string , type: 'folder' | 'file' ): boolean {

    return systemFilePaths.some((file) => file.type === type && file.path === path)
}

function handleMoveOutFolder (curr_path: string): TerminalAction {
    if (curr_path === "/") {
        return setCurrPath(curr_path)
    } 
    const newPath = curr_path.slice(0,-1)
    return setCurrPath(newPath.substring(0, newPath.lastIndexOf("/") + 1))
}

function handleMoveInFolder (target: string, curr_path: string): TerminalAction {
    if (checkPath(target, 'folder')) {
        return setCurrPath(`${target}/`)
    }
    if (checkPath(`${curr_path}${target}`, 'folder')){
        return setCurrPath(`${curr_path}${target}/`)
    }
    if (checkPath(`${curr_path}${target}`, 'file')){
        return addToTerminal([
            getError(
                "Error:",
                `'${target}': is not a directory`
            )
        ])
    }
    return addToTerminal([
        getError(
            "Error:", 
            `'${target}': directory not found`
        )
    ])  
}

function handleCd (target: string, curr_path: string): TerminalAction {
    if (target === "..") {
        return handleMoveOutFolder(curr_path)
    }
    if (target === "/") {
        return setCurrPath("/")
    }
    return handleMoveInFolder(target, curr_path)
}

function handleLs (path: string): TerminalAction {

    const files: string[] = []
    const folders: string[] = []

    getSystemFileItems(
        fileSystem,
        path === "/"
            ? "/"
            : path.slice(0,-1)
    ).map((item) => {
        if (item.type === "") {
            folders.push(item.name)
        } else {
            files.push(item.name)
        }
    })

    return addToTerminal([{
        type: "list_of_files",
        content: {folders: folders, files: files}
    }])
}

function getResolvedPath (target: string, curr_path: string) {

    if (target.startsWith("/")) {
        return target
    }

    const newPath = `${curr_path}${target}`

    return newPath.replace(/\/+/g, "/")
}

function handleCat (file: string, path: string, dispatch: React.Dispatch<TerminalAction>){
    
    const resolvedPath = getResolvedPath(file, path)
    
    if (checkPath(resolvedPath, 'file')){
        if (resolvedPath in availableFiles){
            dispatch({type: "SET_CURR_FILE", value: resolvedPath})
            dispatch(addToTerminal([
                getSuccess("Reading", `${resolvedPath}...`),
                { type: "empty_line", content: {count: 1}}
            ]))
            setTimeout(() => {
                availableFiles[resolvedPath as AvailableTextFileLines].map((line, index) => 
                    setTimeout(() => {
                        dispatch(
                            addToTerminal([line])
                        )
                    }, index*150)
                )
            }, 1000)
        } else {
            dispatch(addToTerminal([
                getWarning(
                    "Warning:",
                    `'${resolvedPath}': has no content`
                )
            ]))
        }
    } else {
        dispatch(addToTerminal([
            getError(
                "Error:",
                `'${file}': file not found`
            )
        ]))
    }
}

function executeSyncCommand(command: string, args: string[], state: TerminalState): TerminalAction{
    if (args.length >= 1) {
        switch(command) {
            case "cd":
                return handleCd(args[0], state.curr_path)
            default:
                return addToTerminal([
                    getError(
                        "Error:",
                        `'${command} ${args.join(" ")}': command not found`
                    )
                ])
        }
    } else {
        switch(command) {
            case "clear":
                return { type: "CLEAR_TERMINAL" }
            case "history":
                return { type: "PRINT_HISTORY" }
            case "help":
                return addToTerminal(availableFiles["help"])
            case "whoami":
                return addToTerminal(availableFiles["whoami"])
            case "ls":
                return handleLs(state.curr_path)
            case "cd":
                return addToTerminal([
                    getWarning(
                        "Warning:",
                        `'${command}': no path specified`
                    )
                ])
            case "cat":
                return addToTerminal([
                    getWarning(
                        "Warning:",
                        `'${command}': no file specified`
                    )
                ])
            default:
                return addToTerminal([
                    getError(
                        "Error:",
                        `'${command}': command not found`
                    )
                ])
        }
    }

}

function executeAsyncCommand(command: string, args: string[], state: TerminalState, dispatch: React.Dispatch<TerminalAction>){
    switch (command) {
        case "cat":
            return handleCat(args[0], state.curr_path, dispatch)
    }
}

export function useTerminalActions(terminalState: TerminalState, dispatch: React.Dispatch<TerminalAction>){
    
    const asyncCommandList = [
        "cat"
    ]

    function handleCommand (command: string) {
        dispatch(
            addToTerminal([{
                type: "command", 
                content: {prompt: command}
            }])
        )
        dispatch(addToHistory(command))
        dispatch({type: "SET_CURR_FILE", value: null})

        const commandList = getCommandList(command)

        if (asyncCommandList.some(name => name === commandList.name)){
            executeAsyncCommand(commandList.name, commandList.args, terminalState, dispatch)
        } else {
            dispatch(executeSyncCommand(commandList.name, commandList.args, terminalState))
        }
    }

    return {
        handleCommand
    }
}