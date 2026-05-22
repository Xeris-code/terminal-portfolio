import { useRef, useEffect } from "react";
import { TerminalEntry } from "@/lib/types"
import { TerminalLine } from "./TerminalLine";

type TerminalOutputProps = {
    entries:  TerminalEntry[];
}

export function TerminalOutput ({
    entries
}: TerminalOutputProps){
    
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [entries]);
    
    return (
        <div ref={terminalRef} className="flex flex-col h-full text-[12px] p-5 overflow-y-auto noScroll">
            {entries.map((entry, index) => (
                <TerminalLine 
                    key={index}
                    entry={entry}
                />
            ))
            }
        </div>
    )
}