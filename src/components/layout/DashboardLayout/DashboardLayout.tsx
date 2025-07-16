"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store";
import { Sidebar } from "./components";
import { DashboardHeader } from "./components/Header";
// import { PageLoader } from "@/components/shared";
// import { useDashboard } from "@/hooks";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { sidebarOpen } = useAppSelector((state) => state?.app);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // const dispatch = useAppDispatch();

  const sideBarWidth = useMemo(() => (sidebarOpen ? 256 : 80), [sidebarOpen]);

  const handleToggleDrawer = useCallback(
    () => setMobileSidebarOpen((prev) => !prev),
    []
  );

  return (
    <div className={`${styles["wrapper"]} px-0`}>
      <div className={`flex flex-col relative dashboard-container px-0`}>
        <main className={`flex  flex-1 relative`}>
          <Sidebar
            handleToggleDrawer={handleToggleDrawer}
            mobileSidebarOpen={mobileSidebarOpen}
          />
          <motion.div
            transition={{ delay: 100 }}
            className={`${styles["container"]} flex-grow flex flex-col  ml-auto z-10 relative max-w-full md:max-w-[calc(100%-var(--sidebar-width))]`}
            style={
              { "--sidebar-width": `${sideBarWidth}px` } as React.CSSProperties
            }
          >
            <DashboardHeader
              sideNavIsOpen={sidebarOpen}
              handleToggleDrawer={handleToggleDrawer}
            />
            <div className="flex-1 p-4 bg-[#f6f6f6]">{children}</div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
