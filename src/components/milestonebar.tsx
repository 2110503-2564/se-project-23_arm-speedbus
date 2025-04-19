"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import CouponCard from "./CouponCard";

type Coupon = {
  percentage: number;
  name: string;
  maxDiscount: number;
  minSpend: number;
  spent: number;
  valid: number;
};

type Props = {
  currentSpending: number;
  coupon: Coupon[];
};

const CARD_WIDTH = 270;

const SpendingMilestoneBar: React.FC<Props> = ({ currentSpending, coupon }) => {
  const milestones = coupon.map((c) => c.spent);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const progressPx = useMemo(() => {
    let progress = 0;
    for (let i = 0; i < milestones.length; i++) {
      if (currentSpending >= milestones[i]) {
        progress = (i + 1) * CARD_WIDTH;
      } else if (i === 0) {
        progress = (currentSpending / milestones[i]) * CARD_WIDTH;
        break;
      } else {
        const prev = milestones[i - 1];
        const next = milestones[i];
        const ratio = (currentSpending - prev) / (next - prev);
        progress = i * CARD_WIDTH + ratio * CARD_WIDTH;
        break;
      }
    }
    return Math.min(progress, milestones.length * CARD_WIDTH);
  }, [currentSpending, milestones]);

  console.log("currentSpending", currentSpending);
  console.log("milestones", milestones);
  coupon.forEach((c) => {
    console.log(
      `${c.name}: spent=${c.spent}, reached=${currentSpending >= c.spent}`
    );
  });

  return (
    <div className="w-full py-10 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="relative overflow-x-auto scrollbar-hide"
        >
          <div
            className="relative flex items-start gap-6 pb-16 pt-10"
            style={{ width: "100%" }}
          >
            <div
              className="absolute top-5 left-0 h-6 bg-gray-100 rounded-full overflow-hidden border border-gray-300 z-0"
              style={{
                width: `${coupon.length * CARD_WIDTH + 100}px`,
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="h-full bg-gray-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPx}px` }}
              />
            </div>

            {coupon.map((item, index) => {
              const reached = currentSpending >= item.spent;

              const position = (index / (coupon.length - 1)) * 100; // คำนวณตำแหน่งของแต่ละ milestone

              return (
                <div
                  key={index}
                  className="flex-shrink-0 relative z-10"
                  style={{
                    width: CARD_WIDTH,
                  }}
                >
                  <div className="flex justify-center">
                    <div
                      className={`absolute top-0 w-[4px] h-12 z-10 transform -translate-y-1/2 ${
                        reached ? "bg-black" : "bg-gray-300"
                      }`}
                      style={{
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>

                  {reached ? (
                    <CouponCard
                      couponName={item.name}
                      percentage={item.percentage}
                      minDisc={item.maxDiscount}
                      minSp={item.minSpend}
                      spent={item.spent}
                      valid={item.valid}
                    />
                  ) : (
                    <div
                      style={{ width: CARD_WIDTH }}
                      className=" rounded-xl border-dashed border-2 border-gray-300 bg-white shadow px-4 py-6 text-center mt-6 h-[260px] flex flex-col justify-center"
                    >
                      <div className="text-xl font-bold text-gray-400 mb-2">
                        {item.percentage}%
                      </div>
                      <p className="text-xs text-gray-400">
                        Spend ${item.spent} to unlock
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          You've spent{" "}
          <span className="font-bold text-gray-700">
            ${currentSpending.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SpendingMilestoneBar;
