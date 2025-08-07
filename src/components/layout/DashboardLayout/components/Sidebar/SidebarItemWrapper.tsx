"use client";
import React, { useCallback, useEffect, useState } from "react";
import { INavItem } from "./SidebarContent";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";

const SidebarItemWrapper: React.FC<
  INavItem & { sideBarOpen?: boolean; onClick?: () => void }
> = ({ title, url, icon, sub, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActivePath = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  useEffect(() => {
    if (!pathname?.includes(url)) {
      setIsOpen(false);
    }
  }, [pathname, url]);

  return (
    <div
      className={`relative flex flex-col gap-4 px-2 ${
        sub ? "bg-gray-100 rounded-lg py-2" : ""
      }`}
      onClick={onClick}
    >
      <SidebarItem
        isActive={isActivePath(url) && !sub}
        icon={icon}
        title={title}
        path={sub ? "#" : url}
        onClick={sub ? () => setIsOpen((prev) => !prev) : undefined}
        sub={sub}
        isOpen={isOpen}
      />
      {isOpen &&
        sub &&
        sub.map(({ title, url, icon }, i) => (
          <SidebarItem
            key={i}
            isActive={isActivePath(url)}
            title={title}
            path={url}
            icon={icon}
          />
        ))}
    </div>
  );
};

export { SidebarItemWrapper };
