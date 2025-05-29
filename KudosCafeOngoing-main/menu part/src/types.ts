export interface MenuItem {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export type Category = 'appetizer' | 'pasta' | 'main-course' | 'dessert' | 'drinks' | 'orders';

export interface BookingFormData {
  name: string;
  contact: string;
  date: string;
  time: string;
  guests: number;
  paymentMethod?: 'payNow' | 'payVenue';
}

export interface PaymentInfo {
  totalAmount: number;
  depositAmount: number;
}