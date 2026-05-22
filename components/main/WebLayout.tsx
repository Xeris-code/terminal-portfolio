type WebLayoutProps = {
    navbar: React.ReactNode;
    sidebar: React.ReactNode;
    terminal: React.ReactNode;
    helpbar: React.ReactNode;
    footer: React.ReactNode;
}

export function WebLayout ({
    navbar, sidebar, terminal, helpbar, footer
}: WebLayoutProps){
    return (
        <main className="app flex flex-col gap-2 p-2 overflow-hidden">
            <div className="flex flex-col w-full h-full border main-border-color rounded-lg overflow-hidden">
                {navbar}
                <div className="flex flex-1 gap-5 px-5 py-5 overflow-hidden">
                    {sidebar}
                    {terminal}
                </div>
                {helpbar}
            </div>
            {footer}
        </main>
    )
}