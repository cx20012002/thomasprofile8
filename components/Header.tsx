"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      className="fixed left-1/2 z-50 flex w-[90%] -translate-x-1/2 items-center justify-between opacity-0 md:w-[600px]"
    >
      <HeaderComponent className="absolute left-[20px] right-[20px] top-[20px] z-50 flex h-[45px] items-start justify-between rounded-[60px] bg-secondary px-[20px] py-[14px] md:h-[62px] md:items-center md:rounded-full md:px-10 md:py-[18px]" />
    </div>
  );
}
