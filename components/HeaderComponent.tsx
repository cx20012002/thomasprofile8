"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/utils/content";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

export default function HeaderComponent({className}: {className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    (_, contextSafe) => {
      const nav = containerRef.current;
      const hamburgerMenu = nav?.querySelector(".hamburger-menu");
      const [topLine, middleLine, bottomLine] = hamburgerMenu?.querySelectorAll("span") || [];
      let switchState = false;

      if (!nav || !hamburgerMenu || !contextSafe) return;

      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.set(nav, { height: 62, borderRadius: 60 });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(nav, { height: 45, borderRadius: 60 });
      });

      const hamburgerClickHandler = contextSafe(() => {
        switchState = !switchState;
        setIsMenuOpen((prevState) => !prevState);

        const tl = gsap.timeline();
        if (switchState) {
          tl.set(middleLine, { display: "none" })
            .to(topLine, { duration: 0.5, rotate: 45, y: 6.5, x: 12, width: "100%" }, 0)
            .to(bottomLine, { duration: 0.5, rotate: -45, y: -6.5, width: "100%" }, 0)
            .to(nav, { duration: 0.5, height: 300, borderRadius: 20 }, 0);
        } else {
          tl.set(middleLine, { display: "block" })
            .to([topLine, bottomLine], {
              duration: 0.5,
              rotate: 0,
              y: 0,
              x: 0,
              width: 14,
            })
            .to(nav, { duration: 0.5, height: 45, borderRadius: 60 }, 0);
        }
      });

      const hamburgerHoverHandler = contextSafe(() => {
        gsap.to(topLine, { duration: 0.3, left: 0 });
        gsap.to(bottomLine, { duration: 0.3, left: 12 });
      });

      const hamburgerLeaveHandler = contextSafe(() => {
        if (switchState) return;
        gsap.to(topLine, { duration: 0.3, left: 12 });
        gsap.to(bottomLine, { duration: 0.3, left: 0 });
      });

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
    <nav
      ref={containerRef}
      className={className}
    >
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
        <span className="absolute right-0 top-0 h-[3px] w-[14px] origin-center bg-textDark" />
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[14px] -translate-x-1/2 -translate-y-1/2 bg-textDark" />
        <span className="absolute bottom-0 left-0 h-[3px] w-[14px] bg-textDark" />
      </div>
    </nav>
  );
}
