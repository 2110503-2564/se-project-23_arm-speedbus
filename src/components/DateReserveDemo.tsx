'use client'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem} from "@mui/material"
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({value,onDateChange}:{value?:Dayjs|null,onDateChange:Function}){
    const [date,setDate] = useState<Dayjs|null>(null);
    const [location,setLocation] = useState('BKK');
    if(value){
        setDate(value);
    }
    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker className="bg-white" format="YYYY-MM-DD" value={date} onChange={(value)=>{setDate(value);onDateChange(value)}}/> */}
                <div className="space-y-4">
                    <DatePicker
                    label="Check-in Date"
                    value={date}
                    onChange={(value) => {setDate(value);onDateChange(value)}}/>
                    <DatePicker
                    label="Check-out Date"
                    value={date}
                    onChange={(value) => {setDate(value);onDateChange(value)}}/>
                </div>
            </LocalizationProvider>
        </div>
    );
}