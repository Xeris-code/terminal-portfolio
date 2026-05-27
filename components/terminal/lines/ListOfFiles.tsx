type ListOfFilesProps = {
    files: string[];
    folders: string[];
}

export function ListOfFiles({files, folders}: ListOfFilesProps){
    
    return (
        <div className="flex gap-5">
            {folders.map((item, index)=>(
                <div key={index} className="text-[#4ADE80]">{item}</div>
            ))}
            {files.map((item, index)=>(
                <div key={index} className="text-[#AAB7AD]">{item}</div>
            ))}
        </div>
    )
}