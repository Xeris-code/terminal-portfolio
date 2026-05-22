type EmptyLineProps = {
    count: number
}

export function EmptyLine({count}: EmptyLineProps){
    return (
        Array.from({length: count}, (_, i) => i).map((i) => (
            <div key={i}>&nbsp;</div>
        ))
    )
}