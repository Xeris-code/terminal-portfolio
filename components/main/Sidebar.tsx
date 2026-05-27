import { Lightbulb } from "lucide-react";
import { FileTree, FolderTree } from "../ui";
import { fileSystem } from "@/lib/terminal";

type SidebarProps = {
  disabled: boolean;
  curr_file: string | null;
  curr_path: string;
  onClick: (command: string) => void
}

export function Sidebar({
  disabled, curr_file, curr_path,
  onClick
}: SidebarProps){
    return (
        <div className="flex flex-col py-4 h-full w-80 border main-border-color rounded-lg text-[12px] overflow-hidden">
            <div className="select-none border-b main-border-color pb-3">
              <span className="px-3"><span className="text-[#62FF86]">xeris</span>@portfolio:~/files</span>
            </div>
            <div className="px-5 py-5 flex flex-col gap-4 flex-1 overflow-y-auto noScroll">
              {fileSystem.children.map((file) => (
                file.type === "file"
                  ? <FileTree 
                      key={file.name}
                      disabled={disabled}
                      label={file.name}
                      active={`/${file.name}` === curr_file}
                      onClick={onClick}
                    >
                  </FileTree>
                  : <FolderTree
                      key={file.name}
                      disabled={disabled}
                      label={file.name}
                      files={file.children.map((file) => (file.name))}
                      active={file.name === curr_path.replace(/\//g, "")}
                      activeFile={curr_file ?? ""}
                      onClick={onClick}
                    >
                  </FolderTree>
              ))}
              
            </div>
            <div className="select-none px-4 pt-4">
                <div className="flex gap-2 border border-[#4ADE80] rounded-lg p-3 text-[12px]">
                  <Lightbulb className="text-[#4ADE80] size-4"/>
                  <div className="flex flex-col gap-2">
                    <span>Tip: <span className="text-[#4ADE80]">Use commands to explore</span></span>
                    <span>Try: ls, cat [file], clear, help</span>
                  </div>
                </div>
            </div>

          </div>
    )
}