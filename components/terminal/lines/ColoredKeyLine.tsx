type ColoredKeyLineProps = {
    placeholder: string;
    message: string;
    type: "success" | "warning" | "error"
}

export function ColoredKeyLine({placeholder, message, type}: ColoredKeyLineProps){
    
    const color = {
        "success": "text-[#62FF86]",
        "warning": "text-[#FFBD2E]",
        "error": "text-[#FF5F56]",
    }
    
    return (
        <div>
            <span className={color[type]}>
                {placeholder}
            </span>
            &nbsp;{message}
        </div>
    )
}