import { useEffect, useState } from "react";
import { TerminalAction, TerminalEntry } from "@/lib/types";

function addToTerminal(entry: TerminalEntry[]): TerminalAction {
  return {
    type: "ADD_TERMINAL_LINES",
    value: entry,
  };
}

const bootLines: TerminalEntry[] = [
  { type: "system", content: { line: "Initializing XerisOS..." } },
  { type: "system", content: { line: "Loading filesystem..." } },
  { type: "system", content: { line: "Mounting /projects..." } },
  { type: "system", content: { line: "Starting terminal session..." } },
  { type: "success", content: { key: "Access", success: "granted" } },
  { type: "empty_line", content: { count: 1 } },
  { type: "system", content: { line: "Type 'help' to begin." } },
];

export function useBootSequence(
  dispatch: React.Dispatch<TerminalAction>
) {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        dispatch(addToTerminal([line]));

        if (index === bootLines.length - 1) {
          setIsBooting(false);
        }
      }, index * 1000);
    });
  }, [dispatch]);

  return {
    isBooting,
  };
}