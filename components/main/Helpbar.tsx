export function Helpbar(){
    return (
        <div className="select-none border-t main-border-color flex justify-between px-5 py-3 text-[12px]">
          <span className="helper-text-gray">
            Type &apos;help&apos; to see available commands
          </span>
          <div className="flex gap-5">
            <span className="helper-text-gray">
              <span className="helper-text-green">↑/↓</span> navigate
            </span>
            <span className="helper-text-gray">
              <span className="helper-text-green">tab</span> autocomplete
            </span>
            <span className="helper-text-gray">
              <span className="helper-text-green">ctrl+l</span> clear line
            </span>
            <span className="helper-text-gray">
              <span className="helper-text-green">clear</span> clear screen
            </span>
          </div>
        </div>
    )
}