import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <div className={`${styles["wrapper"]} border-t z-40 w-full bg-white`}>
      <footer
        className={`${styles.container} ${styles.nav} p-5 flex justify-between items-center gap-3 md:gap-6 text-sm`}
      >
        <div className="flex items-center gap-4 justify-between w-full px-6">
          <span>© 2025 Real estate ref. All Rights Reserved.</span>
          <span className="hidden md:block text-[#798bff] space-x-5">
            <a href="#">Privacy & Policy</a>
            <a href="#">Terms & Condition</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export { Footer };
