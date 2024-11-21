"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { menuItems } from "@/utils/content";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/" },
  { name: "Shop", href: "/" },
  { name: "Locations", href: "/" },
  { name: "Contact", href: "/" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const firstImage = containerRef.current?.querySelector(".first-image");
      if (!firstImage) return;
      gsap
        .timeline({ repeat: -1 })
        .to(firstImage, { opacity: 0, duration: 0.1 })
        .to(firstImage, { opacity: 1, duration: 0.1 }, "+=0.5")
        .to(firstImage, { opacity: 1, duration: 4.8 });
    },
    { scope: containerRef },
  );
  return (
    <footer
      ref={containerRef}
      className="flex w-full flex-col items-center justify-center gap-2 px-2 pb-2 md:gap-4 md:px-4 md:pb-4"
    >
      {/* newsletter */}
      <section className="flex w-full flex-col items-center justify-center rounded-[24px] bg-secondary py-[72px] md:py-24">
        {/* content */}
        <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-[25px] px-4">
          {/* title */}
          <div className="flex w-full flex-col items-center justify-center gap-2 md:gap-4">
            <h4 className="text-[34px] font-[700] leading-[40px] tracking-[-0.04em] text-textDark md:text-[56px] md:leading-[60px]">
              Stay in touch!
            </h4>
            <p className="text-[16px] font-[600] leading-[24px] text-textDark opacity-70">
              Latest offers, news, & goodies to your inbox.
            </p>
          </div>

          {/* form */}
          <form className="relative flex w-full flex-col items-start justify-start gap-4">
            <input
              type="email"
              className="h-[52px] w-full rounded-full bg-white p-6 focus:outline-none md:h-[68px]"
              placeholder="Your email address"
            />
            <button
              type="submit"
              className="h-[52px] w-full rounded-full bg-primary px-5 py-[14px] font-[700] text-white transition-colors duration-300 hover:text-secondary md:absolute md:right-2 md:top-1/2 md:w-auto md:-translate-y-1/2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* footer and navigation */}
      <section className="flex w-full flex-col items-center justify-center gap-[44px] rounded-[24px] bg-primary py-10 md:gap-[60px] md:py-[80px]">
        {/* logo and smile face */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative h-[62px] w-full">
            <Image
              src={"/smile-face2.svg"}
              alt="smile-face"
              width={60}
              height={60}
              className="absolute inset-0 left-1/2 aspect-square w-[62px] -translate-x-1/2"
            />
            <Image
              src={"/smile-face.svg"}
              alt="smile-face"
              width={60}
              height={60}
              className="first-image absolute inset-0 left-1/2 aspect-square w-[62px] -translate-x-1/2"
            />
          </div>
          <Image
            src={"/footer-logo.svg"}
            alt="logo"
            width={400}
            height={181}
            className="aspect-[244/110] h-auto w-[244px] object-contain md:aspect-[400/181] md:w-[400px]"
          />
        </div>
        {/* navigation */}
        <div className="flex flex-col items-center justify-center gap-4">
          <ul className="flex items-center justify-center gap-6 text-[16px] font-[600] leading-[24px] text-white">
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
        </div>
      </section>
    </footer>
  );
}
