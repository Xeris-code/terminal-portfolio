import { Folder } from "lucide-react"
import { TreeFile } from "@/components/ui/sidebar"

type FolderTreeProps = {
    label: string;
    files: string[];
    active: boolean;
    activeFile: string;
    onClick: (command: string) => void;
}

export function FolderTree ({
    label, files, active, activeFile,
    onClick
}: FolderTreeProps) {
    return (
        <div className="flex flex-col">
            <span className={`flex items-center gap-3 ${active ? "active-menu-text" : "non-active-menu-text"}`}>
                <Folder className="size-5"/>
                <span>{label}</span>
            </span>
            <div className={`flex flex-col border-l ${active ? "border-[#4ADE80]" : "border-[#5F6B61]"} ml-2.25 pl-7`}>
                {files.map((file, index) => (
                    <TreeFile 
                        key={index}
                        label={file}
                        folder={label}
                        end={index + 1 === files.length ? true : false}
                        active={activeFile === `/${label}/${file}`}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    )
}