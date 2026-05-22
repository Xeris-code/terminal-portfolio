type ArchitectureLineProps = {
    end?: boolean;
    active?: boolean;
}

export function ArchitectureLine ({
    end=false,
    active=false,
}: ArchitectureLineProps) {
    if (!end) {
        return <div className="flex items-center">
            <div className={`w-[0.5px] h-5 ${active ? "bg-[#4ADE80]" : "bg-[#E5FFE7]"}`}/>
            <div className={`w-4 h-[0.5px] ${active ? "bg-[#4ADE80]" : "bg-[#E5FFE7]"}`}/>
        </div>
    };

    return <div className="flex items-center relative">
        <div className={`absolute -translate-y-1.5 w-[0.5px] h-3  ${active ? "bg-[#4ADE80]" : "bg-[#E5FFE7]"}`}/>
        <div className={`w-4 h-[0.5px] ${active ? "bg-[#4ADE80]" : "bg-[#E5FFE7]"}`}/>
    </div>
}