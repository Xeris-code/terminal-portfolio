import { whoamiLines, aboutLines, helpLines, experienceLines, contactLines, techStackLines, languagesLines, cvmakerLines, repovisualizerLines, portfolioLines, folderforgeLines } from "@/lib/terminal/";
import { TerminalEntry } from "@/lib/types";

type FileNode = {
  name: string;
  type: "file";
}

type FolderNode = {
  name: string;
  type: "folder";
  children: FileSystemNode[];
}


export type FileSystemPath = {
  path: string;
  type: "file" | "folder";
};

export type FileSystemItem = {
  name: string;
  type: string;
}

type FileSystemNode = FileNode | FolderNode

export type AvailableTextFileLines = 
  | "help"
  | "whoami"
  | "/about.txt"
  | "/contact.txt"
  | "/experience.txt"
  | "/skills/tech-stack.txt"
  | "/skills/languages.txt"
  | "/projects/cv-maker.txt"
  | "/projects/portfolio.txt"
  | "/projects/folderforge.txt"
  | "/projects/repo-visualizer.txt"

export const availableFiles: Record<AvailableTextFileLines, TerminalEntry[]> = {
  "help": helpLines,
  "whoami": whoamiLines,
  "/about.txt": aboutLines,
  "/experience.txt": experienceLines,
  "/contact.txt": contactLines,
  "/skills/tech-stack.txt": techStackLines,
  "/skills/languages.txt": languagesLines,
  "/projects/cv-maker.txt": cvmakerLines,
  "/projects/portfolio.txt": portfolioLines,
  "/projects/folderforge.txt": folderforgeLines,
  "/projects/repo-visualizer.txt": repovisualizerLines,
}
    
export const fileSystem: FolderNode = {
    name: "/",
    type: "folder",

    children: [

        {
            name: "projects",
            type: "folder",

            children: [
                {
                    name: "cv-maker.txt",
                    type: "file"
                },

                {
                    name: "portfolio.txt",
                    type: "file"
                },

                {
                    name: "folderforge.txt",
                    type: "file"
                },

                {
                    name: "repo-visualizer.txt",
                    type: "file"
                }
            ]
        },

        {
            name: "skills",
            type: "folder",

            children: [
                {
                    name: "tech-stack.txt",
                    type: "file"
                },

                {
                    name: "languages.txt",
                    type: "file"
                }
            ]
        },

        {
            name: "about.txt",
            type: "file"
        },

        {
            name: "experience.txt",
            type: "file"
        },

        {
            name: "contact.txt",
            type: "file"
        },

        
    ]
}

export function getSystemFilePaths(fileSystem: FolderNode): FileSystemPath[] {
  const paths: FileSystemPath[] = [];

  function walk(node: FileSystemNode, currentPath: string) {
    const nodePath =
      node.name === "/"
        ? "/"
        : `${currentPath === "/" ? "" : currentPath}/${node.name}`;

    paths.push({
      path: nodePath,
      type: node.type,
    });

    if (node.type === "folder") {
      node.children.forEach((child) => {
        walk(child, nodePath);
      });
    }
  }

  walk(fileSystem, "");

  return paths;
}

function getFileExtension(name: string): string {
  const dotIndex = name.lastIndexOf(".");

  if (dotIndex === -1) {
    return "";
  }

  return name.slice(dotIndex);
}

function findNodeByPath(
  node: FileSystemNode,
  targetPath: string,
  currentPath = ""
): FileSystemNode | null {
  const nodePath =
    node.name === "/"
      ? "/"
      : `${currentPath === "/" ? "" : currentPath}/${node.name}`;

  if (nodePath === targetPath) {
    return node;
  }

  if (node.type === "folder") {
    for (const child of node.children) {
      const found = findNodeByPath(child, targetPath, nodePath);

      if (found) {
        return found;
      }
    }
  }

  return null;
}

export function getSystemFileItems(
  fileSystem: FolderNode,
  currentPath: string
): FileSystemItem[] {
  const node = findNodeByPath(fileSystem, currentPath);

  if (!node || node.type !== "folder") {
    return [];
  }

  return node.children.map((child) => {
    return {
      name: child.name,
      type: child.type === "folder" ? "" : getFileExtension(child.name),
    };
  });
}



export const systemFilePaths = getSystemFilePaths(fileSystem);