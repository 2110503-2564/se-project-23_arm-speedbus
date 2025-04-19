export interface ProviderItem {
  _id: string;
  name: string;
  address: string;
  tel: string;
  email: string;
  picture: string;
  openTime: string;
  closeTime: string;
  __v: number;
  id: string;
}
export interface ProviderJson {
  success: boolean;
  data: ProviderItem[];
}

export interface CarItem {
  _id: string;
  name: string;
  vin_plate: string;
  picture: string;
  provider_info: ProviderItem;
  capacity: number;
  description: string;
  pricePerDay: number;
  __v: number;
  id: string;
}
export interface CarJson {
  success: boolean;
  data: CarItem[];
}

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
  totalPayment: number;
  createdAt: string;
  __v: number;
  id: string;
}

export interface BookingVirtual_Car {
  _id: string;
  name: string;
  vin_plate: string;
  pricePerDay: number;
  id: string;
}

export interface BookingVirtual_User {
  _id: string;
  name: string;
}

export interface BookingItem {
  _id: string;
  car_info: BookingVirtual_Car;
  user_info: BookingVirtual_User;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: string;
  iDate: string;
  __v: number;
}

export interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

export interface AuditLogVirtual_User {
  _id: string;
  name: string;
}

export interface AuditLogItem {
  _id: string;
  action: string;
  user_id: AuditLogVirtual_User;
  target: string;
  target_id: string;
  description: string;
  timeStamp: string;
  __v: number;
}

export interface AuditLogJson {
  success: boolean;
  data: AuditLogItem[];
}

export interface CouponItem {
  _id: string;
  user_info: string;
  name: string;
  percentage: number;
  maxDiscount: number;
  minSpend: number;
  spent: number;
  expirationDate: Date;
  status: string;
  __v: number;
}

export interface CouponJson {
  success: boolean;
  count: number;
  data: CouponItem[];
}
