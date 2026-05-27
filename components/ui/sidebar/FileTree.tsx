import { FileText } from "lucide-react"

type FileTreeProps = {
    label: string;
    active?: boolean;
    onClick: (command: string) => void;
}

export function FileTree ({
    label,
    active=false,
    onClick
}: FileTreeProps){
    return (
        <div className={`${active ? "text-[#4ADE80]" : ""}`}>
            <button 
                type="button"
                className="cursor-pointer flex items-center gap-3"
                onClick={() => onClick(`cat /${label}`)}
            >
                <FileText className="size-5"/>
                <span>{label}</span>
            </button>
        </div>
    )
}