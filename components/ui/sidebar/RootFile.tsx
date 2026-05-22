import { ArchitectureLine } from "./ArchitectureLine";

type RootFileProps = {
    label: string;
    end?: boolean;
    active?: boolean;
}

export function RootFile ({
    label,
    end=false,
    active=false,
}: RootFileProps) {
    return (
        <div className="flex gap-2 items-center">
            <ArchitectureLine end={end} active={active}/>
            <span className={active ? "text-[#4ADE80]" : "text-[#8BA38F]"}>{label}</span>
        </div>
    )
}