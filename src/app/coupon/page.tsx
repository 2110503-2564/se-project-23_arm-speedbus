"use client";

import React, { useState, useEffect } from "react";
// import CouponCardItem from "@/components/CouponCardItem"; // adjust the path if necessary
import getCouponTemplates from "@/libs/getCouponTemplates"; // make sure the path is correct
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

  return <SpendingMilestoneBar currentSpending={2000} coupon={couponList} />;
}
