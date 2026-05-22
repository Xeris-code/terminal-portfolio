import { TerminalEntry } from "@/lib/types"
import { AsciLine, ColoredKeyLine, CommandLine, EmptyLine, SystemLine, TableLine } from "./lines";

type TerminalLineProps = {
    entry: TerminalEntry;
}

export function TerminalLine ({
    entry
}: TerminalLineProps) {
    
    switch (entry.type) {
        case "system":
            return <SystemLine line={entry.content.line}/>
        case "command":
            return <CommandLine prompt={entry.content.prompt}/>
        case "asci":
            return <AsciLine lines={entry.content.lines}/>
        case "table":
            return <TableLine columns={entry.content.columns}/>
        case "empty_line":
            return <EmptyLine count={entry.content.count}/>
        case "success":
            return <ColoredKeyLine type="success" placeholder={entry.content.key} message={entry.content.success}/>
        case "warning":
            return <ColoredKeyLine type="warning" placeholder={entry.content.key} message={entry.content.warning}/>
        case "error":
            return <ColoredKeyLine type="error" placeholder={entry.content.key} message={entry.content.error}/>
        case "link":
            return (
                <div className="text-[#4FC3F7]">
                    {entry.content.link}
                </div>
            )
    }
}