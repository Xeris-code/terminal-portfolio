import { TerminalEntry } from "@/lib/types"

type TerminalLineProps = {
    entry: TerminalEntry;
}

export function TerminalLine ({
    entry
}: TerminalLineProps) {
    
    switch (entry.type) {
        case "system":
            return (
                <div>
                    {entry.content.line}
                </div>
            )
        case "command":
            return (
                <div>{entry.content.prompt}</div>
            )
        case "asci":
            return (
                entry.content.lines.map((line, index) => (
                        <div key={index} style={{ whiteSpace: "pre" }} className="max-w-full overflow-x-hidden">
                            {line}
                        </div>
                    ))
            )
        case "empty_line":
            return (
                Array.from({length: entry.content.count}, (_, i) => i).map((i) => (
                    <div key={i}>&nbsp;</div>
                ))
            )
        case "success":
            return (
                <div>
                    <span className="text-[#62FF86]">
                        {entry.content.key}
                    </span>
                    {entry.content.success ? `: ${entry.content.success}` : ``}
                </div>
            )
        case "warning":
            return (
                <div>
                    <span className="text-[#FFBD2E]">
                        {entry.content.key}
                    </span>
                    {entry.content.warning ? `: ${entry.content.warning}` : ``}
                </div>
            )
        case "error":
            return (
                <div>
                    <span className="text-[#FF5F56]">
                        {entry.content.key}
                    </span>
                    {entry.content.error ? `: ${entry.content.error}` : ``}
                </div>
            )
        case "link":
            return (
                <div className="text-[#4FC3F7]">
                    {entry.content.link}
                </div>
            )
    }
}