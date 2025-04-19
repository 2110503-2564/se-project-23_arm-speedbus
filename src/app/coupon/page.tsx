"use client";

import React, { useState, useEffect } from "react";
import CouponCardItem from "@/components/CouponCardItem"; // adjust the path if necessary
import getCouponTemplates from "@/libs/getCouponTemplates"; // make sure the path is correct
import { CouponTemplateItem } from "interfaces";
import SpendingMilestoneBar from "@/components/milestonebar";

export default function Page() {
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    const fetchCouponData = async () => {
      try {
        // ดึงข้อมูลคูปองจาก API โดยไม่ใช้ token
        const coupons = await getCouponTemplates(); // No token required

        // ตรวจสอบว่าได้รับข้อมูลคูปองจาก API
        if (coupons?.data) {
          setCouponList(coupons.data); // เก็บข้อมูลที่ได้จาก API
        } else {
          console.error("No coupon data received");
        }
      } catch (error) {
        console.error("Error loading coupons:", error);
      }
    };

    fetchCouponData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-white">
      {couponList.length > 0 ? (
        couponList.map((c: CouponTemplateItem) => (
          <CouponCardItem
            key={c._id}
            couponName={c.name}
            percentage={c.percentage}
            maxDisc={c.maxDiscount}
            minSp={c.minSpend}
            spent={c.spent}
            valid={c.valid}
            redeemed={false} // This is Mock
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
