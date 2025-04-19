"use client";
import { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { useSession } from "next-auth/react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import Link from "next/link";
import getCar from "@/libs/getCar"; // Assuming this is a function to fetch car details
import getRentsForCar from "@/libs/getRentsForCar"; // Assuming this is a function to fetch rent data for a car
import { CarItem, BookingItem } from "interfaces";
import DateReserve from "@/components/DateReserve";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import createRent from "@/libs/createRent";
import redeemCoupon from "@/components/CouponCard";
import { useRouter } from "next/navigation";
import "./calendar.css";
import CouponCardWrapper from "@/components/CouponCardWrapper";
import { CouponItem } from "interfaces";
import updateCoupon from "@/libs/updateCoupon";

import getMyCoupon from "@/libs/getMyCoupon";

export default function CarDetailPage({ params }: { params: { cid: string } }) {
  const router = useRouter();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [rentedDates, setRentedDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  const { data: session } = useSession();
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRentsForCar = async () => {
      try {
        if (!session?.user?.token) return;
        const rentJson = await getRentsForCar(session.user.token, params.cid);
        const unavailableDates = rentJson.data
          .map((rentItem: BookingItem) => {
            const startDate = new Date(rentItem.startDate);
            const endDate = new Date(rentItem.endDate);
            let currentDate = startDate;
            const dates = [];

            while (currentDate <= endDate) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
          })
          .flat();

        setRentedDates(unavailableDates);
      } catch (error) {
        console.error("Failed to fetch rents:", error);
      }
    };

    fetchCar();
    fetchRentsForCar();
  }, [params.cid, session?.user?.token]);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!session?.user?.token) return;
      const response = await getMyCoupon(session.user.token);
      if (response.success && response.data) {
        setCoupons(response.data);
      }
    };

    fetchCoupons();
  }, [session?.user?.token]);

  useEffect(() => {
    if (startDate && endDate && carItem) {
      const days = endDate.diff(startDate, "day") + 1;
      const price = days * carItem.pricePerDay;
      setTotalPrice(price > 0 ? price : 0);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, carItem]);

  useEffect(() => {
    if (!selectedCoupon || !totalPrice) {
      setDiscountedPrice(null);
      return;
    }

    const selected = coupons.find((c) => c._id === selectedCoupon);
    if (selected) {
      const rawDiscount = (totalPrice * selected.percentage) / 100;
      const discount = Math.min(rawDiscount, selected.maxDiscount);
      console.log(selected.maxDiscount);
      console.log(selected.percentage);
      setDiscountedPrice(Math.round(totalPrice - discount));
    }
  }, [selectedCoupon, totalPrice, coupons]);

  const isDateUnavailable = (date: Date) => {
    return rentedDates.some(
      (rentedDate) => rentedDate.toDateString() === date.toDateString()
    );
  };

  async function handleCreateRent(startDate: string, endDate: string) {
    if (!session) return;

    const res = await createRent(
      session.user.token,
      params.cid,
      session.user.User_info._id,
      startDate,
      endDate
    );

    if (res.success) {
      if (selectedCoupon) {
        const selected = coupons.find((c) => c._id === selectedCoupon);
        if (selected) {
          await updateCoupon(
            session.user.token,
            selected._id,
            selected.percentage,
            selected.name,
            selected.maxDiscount,
            selected.minSpend,
            selected.expirationDate,
            "Used"
          );
        }
      }

      alert("Create Booking Successfully");
      router.push("/booking");
    } else {
      setErrorMessage(res.message);
    }
  }

  if (loading)
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Loading...
      </div>
    );
  if (!carItem)
    return (
      <div className="text-center text-xl text-black-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Car not found
      </div>
    );

  return (
    /* layout ใหม่ตามภาพ UI */

    <main className="min-h-screen px-[5vw] py-10 font-robotoMono text-black flex flex-col gap-12 mt-10">
      {/* Section: Title and Main Content */}
      <div className="flex flex-row items-center gap-20">
        {/* รูป + ชื่อรถ */}
        <div className="flex flex-col items-start ml-20">
          <h1 className="text-[45px] tracking-wider mb-4">{carItem.name}</h1>
          <div className="w-[457px] h-[468px] bg-gray-200 overflow-hidden">
            <Image
              src={carItem.picture}
              alt="Car"
              width={457}
              height={468}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Calendar */}
        <div
          className="flex items-center justify-center mt-12 mx-auto"
          style={{ height: "468px" }}
        >
          <ReactCalendar
            className="text-black react-calendar"
            tileClassName={({ date }) =>
              isDateUnavailable(date) ? "red-underline" : ""
            }
          />
        </div>
      </div>

      <hr className="border-t border-black/40" />

      {/* Description and Form */}
      <div className="flex flex-row ml-20 gap-12 min-h-[320px]">
        {/* Description: ครึ่งซ้าย */}
        <div className="w-1/2 max-w-md h-full ">
          <h2 className="text-[45px]  tracking-wide mb-2 font-robotoMono">
            DESCRIPTION
          </h2>
          <p className="text-sm leading-5 text-light text-black/80 whitespace-pre-line font-robotoMono">
            {carItem.description}
          </p>
          <p className="mt-4 text-md font-bold font-robotoMono">
            Total:&nbsp;
            {discountedPrice !== null ? (
              <>
                <span className="text-gray-500 line-through text-xl mr-2">
                  ${totalPrice}
                </span>
                <span className="text-black text-2xl font-semibold">
                  ${discountedPrice}
                </span>
                <span className="text-sm text-gray-600 font-normal ml-2">
                  (${carItem.pricePerDay}/day)
                </span>
              </>
            ) : (
              <>
                <span className="text-black font-normal text-2xl">
                  ${totalPrice}
                </span>
                <span className="text-sm text-gray-600 font-normal ml-2">
                  (${carItem.pricePerDay}/day)
                </span>
              </>
            )}
          </p>
        </div>

        {/* Form: ครึ่งขวา */}
        <div className="w-1/2 flex items-center justify-center h-full mx-auto">
          {session ? (
            <div className="flex flex-col items-center w-full max-w-sm font-robotoMono">
              <DateReserve
                value={startDate}
                onDateChange={(value: Dayjs | null) => setStartDate(value)}
                label="Check-In Date"
              />
              <DateReserve
                value={endDate}
                onDateChange={(value: Dayjs | null) => setEndDate(value)}
                label="Check-Out Date"
              />
              <select
                value={selectedCoupon}
                onChange={(e) => setSelectedCoupon(e.target.value)}
                className="mt-3 border border-black text-white rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
              >
                <option value="">Select a coupon</option>
                {coupons
                  .filter((coupon) => coupon.status !== "Used")
                  .map((coupon: any) => (
                    <option key={coupon._id} value={coupon._id}>
                      {coupon.name} - {coupon.percentage}%
                    </option>
                  ))}
              </select>

              <button
                onClick={() => {
                  handleCreateRent(
                    dayjs(startDate)
                      .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                      .toString(),
                    dayjs(endDate)
                      .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                      .toString()
                  );
                }}
                className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
              >
                Book
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2 text-sm text-center">
                  {errorMessage}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-2 w-full max-w-2xl font-robotoMono">
              <Link href="/api/auth/signin">
                <h2 className="text-xl my-4 text-[#2d336b] text-center hover:text-[#7886c7] transition font-robotoMono">
                  Sign in to book your rent
                </h2>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
