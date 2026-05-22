type TableLineProps = {
    columns: {left: string, right: string}[]
}

export function TableLine({columns}: TableLineProps){
    return (
        <div className="flex flex-col">
            {columns.map((col, index)=>(
                <div key={index} className="grid grid-cols-[100px_1fr]">
                    <div>{col.left}</div>
                    <div className="text-[#8BA38F]">{col.right}</div>
                </div>
            ))}
        </div>
    )
}