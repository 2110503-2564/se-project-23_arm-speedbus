'use client';

import { CouponItem } from 'interfaces';
import React, { useRef, useState, useEffect, useMemo } from 'react';

type Coupon = {
  name: string,
  percentage: number,
  maxDisc: number,
  minSp: number,
  spent: number,
  valid: number,
  redeemed: boolean,
  milestones: number
};

type Props = {
  currentSpending: number;
  coupon: Coupon[];
};

const CARD_WIDTH = 180;

const SpendingMilestoneBar: React.FC<Props> = ({ currentSpending, coupon }) => {
  const milestones = coupon.map(c => c.milestones);
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
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
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
            style={{ width: `${milestones.length * CARD_WIDTH}px` }}
          >
            <div className="absolute top-5 left-0 w-full h-6 bg-gray-100 rounded-full overflow-hidden border border-gray-300 z-0">
              <div
                className="h-full bg-gray-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPx}px` }}
              />
            </div>

            {coupon.map((item, index) => {
              const reached = currentSpending >= item.milestones;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 relative z-10"
                  style={{ width: CARD_WIDTH }}
                >
                  {/* Vertical line spot */}
                  <div className="flex justify-center">
                    <div
                      className={`absolute top-0 w-[4px] h-12 z-10 transform -translate-y-1/2 ${
                        reached ? 'bg-black' : 'bg-gray-300'
                      }`}
                      style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                  </div>

                  <div
                    className={`rounded-xl shadow-md px-4 py-6 text-center border-2 transition-all duration-300 mt-6 ${
                      reached ? 'border-gray-400 bg-gray-100' : 'border-dashed border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-700">{item.percentage}%</div>
                    {reached && (
                      <>
                        <hr className="my-2 border-dashed border-t-2 border-gray-300" />
                        <div className="text-sm font-medium text-gray-700">{item.name}</div>
                        <p className="text-xs text-gray-500 mt-1">Max Discount: ${item.maxDisc}</p>
                        <p className="text-xs text-gray-500">Spend: ${item.milestones}</p>
                        <p className="text-xs text-gray-500">Valid for {item.valid} days</p>
                        <button className="mt-4 px-3 py-1 bg-gray-500 text-white text-xs rounded">
                          Redeem
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          You've spent <span className="font-bold text-gray-700">${currentSpending.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default SpendingMilestoneBar;