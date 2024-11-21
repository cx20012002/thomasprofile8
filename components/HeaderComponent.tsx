"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/utils/content";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

export default function HeaderComponent({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    (_, contextSafe) => {
      const nav = containerRef.current;
      const hamburgerMenu = nav?.querySelector(".hamburger-menu");
      const hamburgerMenuList = nav?.querySelector(".hamburger-menu-list");
      const [topLine, middleLine, bottomLine] = hamburgerMenu?.querySelectorAll("span") || [];
      let switchState = false;

      if (!nav || !hamburgerMenu || !hamburgerMenuList || !contextSafe) return;

      const setInitialStyles = (width: number, height: number, xTop: number, xBottom: number) => {
        gsap.set(hamburgerMenuList, { opacity: 0, x: -100 });
        gsap.set(nav, { height, borderRadius: 60 });
        gsap.set(topLine, { rotate: 0, x: xTop, width: 14 });
        gsap.set(middleLine, { display: "block" });
        gsap.set(bottomLine, { rotate: 0, x: xBottom, width: 14 });
        switchState = false;
      };

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => setInitialStyles(62, 62, 0, 0));
      mm.add("(max-width: 767px)", () => setInitialStyles(45, 45, 7, -7));

      const toggleMenu = (isOpen: boolean) => {
        const tl = gsap.timeline();
        if (isOpen) {
          tl.set(middleLine, { display: "none" })
            .to(topLine, { duration: 0.5, rotate: 45, y: 6.5, x: 0, width: 20 }, 0)
            .to(bottomLine, { duration: 0.5, rotate: -45, y: -6.5, x: 0, width: 20 }, 0)
            .to(nav, { duration: 0.5, height: 300, borderRadius: 20 }, 0)
            .to(hamburgerMenuList, { duration: 0.3, opacity: 1, x: 0 });
        } else {
          tl.set(middleLine, { display: "block" })
            .to([topLine, bottomLine], {
              duration: 0.5,
              rotate: 0,
              y: 0,
              x: 0,
              width: 14,
            })
            .to(nav, { duration: 0.5, height: 45, borderRadius: 60 }, 0)
            .set(hamburgerMenuList, { opacity: 0, x: -100 }, 0);
        }
      };

      const hamburgerClickHandler = contextSafe(() => {
        switchState = !switchState;
        setIsMenuOpen((prevState) => !prevState);
        toggleMenu(switchState);
      });

      const handleHover = (xTop: number, xBottom: number) => {
        if (switchState) return;
        gsap.to(topLine, { duration: 0.3, x: xTop });
        gsap.to(bottomLine, { duration: 0.3, x: xBottom });
      };

      const hamburgerHoverHandler = contextSafe(() => handleHover(-7, 7));
      const hamburgerLeaveHandler = contextSafe(() => handleHover(7, -7));

      hamburgerMenu.addEventListener("click", hamburgerClickHandler);
      hamburgerMenu.addEventListener("mouseover", hamburgerHoverHandler);
      hamburgerMenu.addEventListener("mouseleave", hamburgerLeaveHandler);
      return () => {
        hamburgerMenu.removeEventListener("click", hamburgerClickHandler);
        hamburgerMenu.removeEventListener("mouseover", hamburgerHoverHandler);
        hamburgerMenu.removeEventListener("mouseleave", hamburgerLeaveHandler);
      };
    },
    { scope: containerRef },
  );

  return (
    <nav ref={containerRef} className={className}>
      {/* logo */}
      <div className="w-[44px] md:w-[52px]">
        <Image src={"/logo.svg"} alt="logo" width={52} height={22} />
      </div>

      {/* navigation */}
      <ul className="hidden items-center justify-center gap-6 text-[16px] font-[600] leading-[24px] text-textDark md:flex">
        {menuItems.map((item) => (
          <li key={item.title} className="h-[26px] overflow-hidden">
            <Link
              href={item.href}
              className="flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1/2"
            >
              <span>{item.title}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* hamburger menu */}
      <div className="hamburger-menu group relative flex h-[16px] w-[26px] cursor-pointer flex-col items-center justify-between md:hidden">
        <span className="absolute top-0 h-[3px] w-[14px] origin-center bg-textDark" />
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[14px] -translate-x-1/2 -translate-y-1/2 bg-textDark" />
        <span className="absolute bottom-0 h-[3px] w-[14px] origin-center bg-textDark" />
      </div>

      {/* hamburger menu list */}
      <ul className="hamburger-menu-list absolute bottom-5 left-4 flex flex-col justify-center gap-4 text-[16px] font-[600] leading-[24px] text-textDark">
        {menuItems.map((item) => (
          <li key={item.title} className="h-[26px] overflow-hidden">
            <Link href={item.href} className="flex flex-col transition-transform duration-300 hover:-translate-y-1/2">
              <span>{item.title}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
