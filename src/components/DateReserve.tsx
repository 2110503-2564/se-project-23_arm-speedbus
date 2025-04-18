'use client'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem} from "@mui/material"
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({value,onDateChange,label}:{value?:Dayjs|null,onDateChange:Function,label?: string;}){
    const [date,setDate] = useState<Dayjs|null>(null);
    const [location,setLocation] = useState('BKK');
    if(value){
        setDate(value);
    }
    return (
        <div className="space-x-5 w-fit py-3 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" label={label} value={date} onChange={(value)=>{setDate(value);onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}