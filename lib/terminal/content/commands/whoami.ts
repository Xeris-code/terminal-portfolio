import { TerminalEntry } from "@/lib/types"

export const whoamiLines:TerminalEntry[] = [
    {type: "empty_line", content: {count:1}},
    {type: "table", content: {columns: [
        {left: "Name:", right: "Peter 'Xeris' Cisovsky"},
        {left: "Role:", right: "V&V Engineer for safety I&C systems in NPP"},
        {left: "Focus:", right: "Automation, UI systems, web apps"},
        {left: "Location:", right: "Slovakia"},
    ]}},
    {type: "empty_line", content: {count:1}},
    {type: "system", content: {line: "Currently building:"}},
    {type: "success", content: {key: "-", success: "Terminal Portfolio"}},
    {type: "success", content: {key: "-", success: "CV Maker"}},
    {type: "success", content: {key: "-", success: "FolderForge"}},
    {type: "empty_line", content: {count:1}},
    {type: "system", content: {line: "Interests:"}},
    {type: "success", content: {key: "-", success: "Clean UI/UX"}},
    {type: "success", content: {key: "-", success: "Terminal interfaces"}},
    {type: "success", content: {key: "-", success: "AI & automation"}},
    {type: "success", content: {key: "-", success: "Linux / dev tooling"}},
    {type: "empty_line", content: {count:1}},   
]