"use client";
import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";
import { AnimatePresence, motion } from "framer-motion";

const Tooltip: React.FC<{
  children: React.ReactNode;
  text: string;
  showTooltip?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  zIndex?: number;
  positionClassName?: string;
}> = ({
  children,
  text,
  showTooltip = true,
  position = "top",
  zIndex = 50,
  positionClassName = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const shouldShow = useMemo(
    () => showTooltip === true && isHovered,
    [isHovered, showTooltip]
  );
  // Positioning styles
  const positionClasses: Record<string, string> = {
    top: "-top-12 left-1 -translate-x-1/2",
    bottom: "top-12 left-1 -translate-x-1/2",
    left: "top-1 -translate-y-1/2 -left-28",
    right: "top-1 -translate-y-1/2 left-12",
  };

  const arrowClasses: Record<string, string> = {
    top: "top-full right-1/2 translate-x-1/2 border-t-white",
    bottom: "bottom-full right-1/2 translate-x-1/2 border-b-white",
    left: "top-1/2 left-full -translate-y-1/2 border-l-white",
    right: "top-1/2 right-full -translate-y-1/2 border-r-white",
  };

  // Animation direction
  const motionVariants = {
    top: { opacity: 0, y: -10, x: 0 },
    bottom: { opacity: 0, y: 10, x: 0 },
    left: { opacity: 0, x: -10, y: 0 },
    right: { opacity: 0, x: 10, y: 0 },
  };

  return (
    <div
      className={`${styles["container"]} w-full h-full flex items-center justify-center z-${zIndex} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative">{children}</div>
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            // initial={{ opacity: 0, x: -5 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -5 }}
            // transition={{ duration: 0.2 }}
            // // -top-10 left-1/2 -translate-x-1/2
            // className="absolute left-0 top-1 bg-white text-xs px-4 py-2 rounded-md shadow-lg"
            initial={motionVariants[position]}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={motionVariants[position]}
            transition={{ duration: 0.2 }}
            className={`absolute ${positionClasses[position]} ${positionClassName}`}
          >
            <div className="relative">
              <div
                className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
              />
              <div className="whitespace-nowrap bg-white text-xs px-4 py-2 rounded-md shadow-lg">
                {text}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Tooltip };
