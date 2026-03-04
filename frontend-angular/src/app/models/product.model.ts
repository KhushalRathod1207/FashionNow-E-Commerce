export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  date: number;
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
  message?: string;
}

export interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

export interface CartResponse {
  success: boolean;
  cartData: CartItems;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  name?: string;
  message?: string;
}

export interface OrderItem {
  _id: string;
  userId: string;
  items: any[];
  amount: number;
  address: any;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
}

export interface OrderResponse {
  success: boolean;
  orders: OrderItem[];
  message?: string;
}
