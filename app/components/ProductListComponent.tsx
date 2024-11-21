"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ProductListComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const firstImage = containerRef.current?.querySelector(".first-image");
      const productsContainer = containerRef.current?.querySelector(
        ".products-container",
      );
      const productItems =
        containerRef.current?.querySelectorAll(".product-item");

      if (!firstImage || !productsContainer || !productItems) return;

      productItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 95%",
          end: "top 95%",
          animation: gsap.from(item, {
            y: 200,
            duration: 1,
          }),
        });
      });

      gsap
        .timeline({ repeat: -1 })
        .to(firstImage, { opacity: 0, duration: 0.1 })
        .to(firstImage, { opacity: 1, duration: 0.1 }, "+=0.5")
        .to(firstImage, { opacity: 1, duration: 4.8 });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );
  return (
    <section
      ref={containerRef}
      className="flex w-full flex-col rounded-[24px] bg-[#eaedf6] px-2 pb-2 md:px-4 md:pb-4"
    >
      <div className="relative flex w-full flex-col items-center justify-center px-4 pb-10 pt-12 md:pb-14 md:pt-20">
        <div className="relative flex w-[545px] flex-col items-center justify-start gap-5">
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
          <div className="relative flex w-full flex-col items-center justify-center text-center text-[20px] font-bold leading-[32px] tracking-[-0.04em] text-textDark md:text-[56px] md:leading-[60px]">
            <h4>Roasted goodness to your doorstep!</h4>
          </div>
        </div>
      </div>

      <div className="products-container grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="product-item flex w-full flex-col justify-between overflow-hidden rounded-[16px] bg-white"
          >
            <div className="relative w-full">
              <Image
                src={"/product-image.avif"}
                alt="product"
                width={548}
                height={400}
                className="w-full object-cover"
              />
            </div>
            <div className="flex w-full items-center justify-between p-6">
              <div className="flex w-full flex-col justify-center gap-1">
                <h3 className="text-[16px] font-semibold text-textDark">
                  Kozmo
                </h3>
                <p className="text-[12px] text-[#70758c]">
                  Ground coffee, medium roast
                </p>
              </div>
              <div className="flex items-center justify-center rounded-full bg-[#eaedf6] p-3 text-sm font-semibold text-textDark">
                $19.99
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
