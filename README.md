# Xeris Terminal Portfolio

Interactive terminal-style developer portfolio built from scratch with React, TypeScript and TailwindCSS.

Live version: https://xeris.sk

Repository: https://github.com/Xeris-code/terminal-portfolio

---

## About

This project simulates a real terminal environment inside the browser.

Instead of a traditional portfolio layout, the entire UI is built around:
- command execution
- filesystem navigation
- terminal output rendering
- interactive shell behavior

The goal was to create a portfolio that feels like an actual system rather than a static webpage.

---

## Features

### Terminal Engine
- command parser
- command history navigation
- async command execution
- animated line-by-line output
- terminal boot sequence
- interactive prompt
- blinking cursor
- auto-scroll behavior

### Virtual Filesystem
- custom filesystem structure
- folders & files
- relative and absolute paths
- path resolution
- active file tracking

### Supported Commands

```bash
help
whoami
ls
cd
cat
history
clear
```

### Autocomplete
- command autocomplete
- folder suggestions
- file suggestions
- shell-like `Tab` behavior

### UI
- interactive sidebar
- navbar shortcuts
- active folder/file states
- terminal-inspired styling
- responsive layout
- custom terminal rendering system

---

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Lucide React
- Reducer-based state architecture

---

## Architecture

The application is structured around a custom terminal execution pipeline:

```txt
User Input
   ↓
Command Parser
   ↓
Sync / Async Command Handler
   ↓
Reducer Actions
   ↓
Terminal State
   ↓
Rendered Terminal Output
```

Main systems:
- terminal renderer
- filesystem abstraction
- autocomplete engine
- async typing system
- command execution layer
- reducer-driven terminal state

---

## Example Usage

```bash
help
```

```bash
ls
```

```bash
cd projects
```

```bash
cat portfolio.txt
```

```bash
cat /projects/repo-visualizer.txt
```

---

## Why I Built This

Most developer portfolios follow the same structure:
- hero section
- project cards
- contact section

I wanted to build something more interactive and system-oriented.

This project was created to explore:
- terminal UX
- frontend architecture
- state management
- interactive UI systems
- async rendering
- TypeScript-heavy application structure

---

## Future Improvements

- command aliases
- terminal themes
- advanced autocomplete
- fake shell processes
- mobile terminal optimization
- additional shell commands
- vim-style navigation
- command piping simulation

---

## Local Development

```bash
git clone https://github.com/Xeris-code/terminal-portfolio.git

cd terminal-portfolio

npm install

npm run dev
```

---

## Author

Peter "Xeris" Čišovský

- GitHub: https://github.com/Xeris-code
- LinkedIn: https://www.linkedin.com/in/xeris-code/
- Portfolio: https://xeris.sk