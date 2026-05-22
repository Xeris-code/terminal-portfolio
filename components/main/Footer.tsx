import Image from "next/image"

export function Footer (){
    return (
        <div className="select-none border main-border-color rounded-lg px-5 py-3 w-full flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-5">
                <span>Find me on:</span>
                <a target="_blank" href="https://github.com/Xeris-code">
                    <Image alt="github" width={24} height={24} src="icons/github.svg"/>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/xeris-code/">
                    <Image alt="linkedin" width={24} height={24} src="icons/linkedin.svg"/>
                </a>
                <a target="_blank" href="">
                    <Image alt="mail" width={24} height={24} src="icons/mail.svg"/>
                </a>
            </span>
            <span>
                @ 2026 <span className="text-[#62FF86]">Xeris</span>. All rights reserved.
            </span>
        </div>
    )
}