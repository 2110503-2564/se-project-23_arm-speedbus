"use client";

import React, { useState, useEffect } from "react";
// import CouponCardItem from "@/components/CouponCardItem"; // adjust the path if necessary
import getCouponTemplates from "@/libs/getCouponTemplates"; // make sure the path is correct
import SpendingMilestoneBar from "@/components/milestonebar";
import { useSession } from "next-auth/react";

export default function Page() {
  const [couponList, setCouponList] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCouponData = async () => {
      try {
        // ดึงข้อมูลคูปองจาก API โดยไม่ใช้ token
        const coupons = await getCouponTemplates(); // No token required
        console.log(JSON.stringify(session?.user.User_info, null, 2));
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
    <SpendingMilestoneBar
      currentSpending={session?.user.User_info.totalPaymentThisYear as number}
      coupon={couponList}
    />
  );
}
