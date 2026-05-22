type CommandLineProps = {
    prompt: string
}

export function CommandLine({prompt}: CommandLineProps){
    return (
        <div>{prompt}</div>
    )
}