import { TerminalEntry } from "@/lib/types"

export const helpLines:TerminalEntry[] = [
    {type: "system", content: {line: "Available commands:"}},
    {type: "empty_line", content: {count:1}},
    {type: "table", content: {columns: [
        {left: "help", right: "Show available commands"},
        {left: "whoami", right: "Display profile information"},
        {left: "ls", right: "List available files"},
        {left: "cd ..", right: "Move out of a folder"},
        {left: "cd [folder]", right: "Move in a folder"},
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