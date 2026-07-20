export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  unit: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  savedAddresses: string[];
  isAdmin: boolean;
}

export interface Order {
  id: string; // Internal id (uuid)
  orderId: string; // Human readable #NG-XXXXX
  items: {
    product: Product;
    quantity: number;
    subtotal: number;
  }[];
  subtotal: number;
  deliveryZone: string;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'Pending' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Paid' | 'Failed';
  paymentDetails?: {
    reference: string;
    channel: string;
    date: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  description: string;
  timeline: string;
}
