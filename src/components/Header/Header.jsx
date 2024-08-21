import React from "react";
import { HomeNav, Logo } from "../index";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/motion";

export const Header = () => {
  return (
    <motion.nav variants={navVariants} initial="hidden" whileInView="show">
      <header className="py-4 sm:py-8 px-1 sm:px-4">
        <nav className="relative flex justify-between gap-8 items-center text-white rounded-full px-8 py-2 ">
          <div className="absolute w-[50%] inset-0 gradient-01"></div>
          <div className="flex items-center gap-2">
            <Logo className="w-[40px] h-[40px]" />
            <Link to="/">
              <span className="text-gradient text-[25px] tracking-wider leading-[30.24px] font-vanguard-bold">
                LOGICDART
              </span>
            </Link>
          </div>

          <HomeNav />
        </nav>
      </header>
    </motion.nav>
  );
};
