import { TerminalState } from "@/lib/types";

export const initialTerminalState: TerminalState = {
    terminalLines: [
{type: "asci", content: { lines: [
"__  __         _       ____            _    __       _ _       ",
"\\ \\/ /___ _ __(_)___  |  _ \\ ___  _ __| |_ / _| ___ | (_) ___  ",
" \\  // _ \\ '__| / __| | |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\ ",
" /  \\  __/ |  | \\__ \\ |  __/ (_) | |  | |_|  _| (_) | | | (_) |",
"/_/\\_\\___|_|  |_|___/ |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ ",
    ]}},
{type: "empty_line", content: {count: 1}},
{type: "system", content: {line: "Welcome to my portfolio webpage, you can call me Xeris."}},
{type: "empty_line", content: {count: 1}},
{type: "system", content: {line: "Type 'help' to begin."}},
    ],
    commandHistory: [],

}

