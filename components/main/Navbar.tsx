import { NavMenu, NavMenuList } from "@/lib/types"
import Image from "next/image"

type NavBarProps = {
    activeMenu: NavMenu;
    menuList: NavMenuList;
    onMenuChange: (value: NavMenu) => void;
}

export function NavBar ({
    activeMenu, menuList,
    onMenuChange
}: NavBarProps){
    return (
        <div className="select-none border-b main-border-color w-full flex items-center justify-between px-5 py-3 text-[14px]">
            <span className="flex gap-2 items-center">
                <Image alt="logo" width={32} height={32} src="icons/logo.svg" />
                <span><span className="text-[#62FF86]">xeris</span>@portfolio:~</span>
            </span>
            <div className="flex gap-4">
            {menuList.map((menu, index) => (
              <button
                key={index} 
                className={`relative cursor-pointer ${activeMenu === menu.type ? "text-[#62FF86] font-bold" : "hover:scale-[1.02]"}`}
                onClick={() => onMenuChange(menu.type)}>
                {menu.label}
                {activeMenu === menu.type && 
                  <div className="absolute translate-y-2.5 w-full h-px bg-[#62FF86]"/>
                }
              </button>
            ))}
          </div>
        </div>
    )
}