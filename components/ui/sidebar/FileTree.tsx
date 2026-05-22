import { FileText } from "lucide-react"

type FileTreeProps = {
    label: string;
    active?: boolean;
}

export function FileTree ({
    label,
    active=false
}: FileTreeProps){
    return (
        <div className={`flex items-center gap-3 ${active ? "text-[#4ADE80]" : ""}`}>
            <FileText className="size-5"/>
            <span>{label}</span>
        </div>
    )
}