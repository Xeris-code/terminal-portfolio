import { TerminalEntry } from "@/lib/types"

export const contactLines:TerminalEntry[] = [
    {type: "system", content: {line: "GitHub:"}},
    {type: "link", content: {link: "github.com/Xeris-code"}},
    {type: "empty_line", content: {count:1}},
    {type: "system", content: {line: "LinkedIn:"}},
    {type: "link", content: {link: "linkedin.com/in/xeris-code"}},
    {type: "empty_line", content: {count:1}},
    {type: "system", content: {line: "Email:"}},
    {type: "system", content: {line: "pcisovsky2c@gmail.com"}},
    {type: "empty_line", content: {count:1}},
    {type: "system", content: {line: "Focus:"}},
    {type: "system", content: {line: "Open-source projects, frontend engineering, developer tooling and interactive UI systems."}},
]