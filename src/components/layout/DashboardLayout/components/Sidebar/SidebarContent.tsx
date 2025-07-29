import React, { useCallback, useMemo } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
// import { Chevron, AgencyLogo, Logout } from "@/app/assets";
import { logout, toggleSideBar, useAppDispatch } from "@/store";
import { SidebarItemWrapper } from "./SidebarItemWrapper";
// import { Chevron } from "@/assets";
import { dashboardNavigation } from "@/constants/navigation";
import { Chevron } from "@/assets";
import { handleLogoutRedirect } from "@/utils";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
// import { Image } from "@/components/shared";

export interface INavItem {
  title: string;
  url: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  sub?: {
    title: string;
    url: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}

const SidebarContent: React.FC<{
  isOpen: boolean;
  className?: string;
}> = ({ isOpen, className = "" }) => {
  const dispatch = useAppDispatch();

  const dashboardPaths: INavItem[] = useMemo(() => {
    return dashboardNavigation || [];
  }, []);

  const handleToggleSidebar = useCallback(
    () => dispatch(toggleSideBar()),
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    try {
      dispatch(logout());
      handleLogoutRedirect();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(logout());
      handleLogoutRedirect();
    }
  }, [dispatch]);

  return (
    <div className={`${styles["wrapper"]} flex flex-col h-full min-h-screen`}>
      <motion.div
        className={`${styles["container"]} ${
          isOpen ? styles["open"] : styles["close"]
        } h-full flex-grow bg-white flex flex-col py-2 border rounded-xl border-[#E4E4E7] relative`}
      >
        <div
          className={`flex justify-between items-center p-2 ${
            !isOpen ? "" : "gap-3 md:gap-6"
          }`}
        >
          <Link href={"#"}>
            <div className="flex items-center gap-2 justify-center h-10">
              {/* <Logo width={32} height={32} /> */}
              <div className={`${!isOpen && "hidden"}`}>
                <p className="text-sm font-semibold">EduSphere</p>
              </div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-5 ml-auto">
            <button
              type="button"
              onClick={handleToggleSidebar}
              className={`border-none p-2 ${
                !isOpen
                  ? "bg-white absolute -right-5 top-5 rounded-full shadow-md"
                  : "bg-transparent"
              }`}
            >
              <Chevron width={20} className={`${isOpen ? "" : "rotate-180"}`} />
            </button>
          </div>
        </div>

        <div
          className={`mt-2 pt-2 flex flex-col gap-4 no-scrollbar mb-auto ${className}`}
        >
          <div
            className={`${
              !isOpen && "hidden"
            } text-xs text-[#3F3F46] font-normal px-4`}
          >
            Menu
          </div>
          {dashboardPaths.map(({ title, url, icon, sub }, i) => (
            <SidebarItemWrapper
              icon={icon}
              title={title}
              url={url}
              key={i}
              sub={sub}
              sideBarOpen={isOpen}
            />
          ))}
        </div>
        <div className="md:mt-5 space-y-4 border-gray-150 md:pt-5 pb-2 p-2">
          {/* <SidebarItemWrapper
            icon={Settings}
            title="Settings"
            onClick={handleLogout}
            url=""
          /> */}
          <SidebarItemWrapper
            icon={LogOutIcon}
            title="Log out"
            onClick={handleLogout}
            url=""
          />
        </div>
      </motion.div>
    </div>
  );
};

export { SidebarContent };
