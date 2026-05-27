import { ArchitectureLine } from "./ArchitectureLine";

type TreeFileProps = {
    label: string;
    disabled: boolean;
    folder: string;
    end?: boolean;
    active?: boolean;
    onClick: (command: string) => void;
}

export function TreeFile ({
    label, disabled, folder,
    end=false,
    active=false,
    onClick
}: TreeFileProps) {
    return (
        <div className="flex gap-2 items-center">
            <ArchitectureLine end={end} active={active}/>
            <button
                type="button"
                disabled={disabled}
                className="cursor-pointer flex items-center gap-3"
                onClick={() => onClick(`cat /${folder}/${label}`)}
            >
                <span className={active ? "text-[#4ADE80]" : "text-[#8BA38F]"}>{label}</span>
            </button>
        </div>
    )
}