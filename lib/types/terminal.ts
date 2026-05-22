export type TerminalOutput = {
    "command": { prompt: string },
    "system": { line: string },
    "success": { key: string, success: string },
    "warning": { key: string, warning: string },
    "error": { key: string, error: string },
    "link": { link: string },
    "asci": { lines: string[] },
    "empty_line": { count: number },
    "table": {columns: {left: string, right: string}[]}
}

export type TerminalEntry = {
    [K in keyof TerminalOutput]: {type: K, content: TerminalOutput[K]}
}[keyof TerminalOutput]