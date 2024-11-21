"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { menuItems } from "@/utils/content";
import HeaderComponent from "./HeaderComponent";
export default function Header() {
  gsap.registerPlugin(ScrollTrigger);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      ScrollTrigger.create({
        trigger: container,
        start: "600 20%",
        end: "600 20%",
        scrub: 1,
        animation: gsap.fromTo(
          container,
          {
            y: -200,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.inOut",
          },
        ),
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed left-1/2 z-50 flex w-[90%] md:w-[600px] -translate-x-1/2 items-center justify-between opacity-0"
    >
      <HeaderComponent className="absolute left-[20px] right-[20px] top-[20px] z-50 flex h-[45px] items-start justify-between rounded-[60px] bg-secondary px-[20px] py-[14px] md:h-[62px] md:items-center md:rounded-full md:px-10 md:py-[18px]" />
      {/* <div className="w-[44px] md:w-[52px]">
        <Image src={"/logo.svg"} alt="logo" width={52} height={22} />
      </div>
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
      </ul> */}
    </div>
  );
}
