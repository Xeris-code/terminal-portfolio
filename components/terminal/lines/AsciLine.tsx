type AsciLineProps = {
    lines: string[]
}

export function AsciLine({lines}: AsciLineProps){
    return (
        lines.map((line, index) => (
            <div key={index} style={{ whiteSpace: "pre" }}>
                {line}
            </div>
        ))
    )
}