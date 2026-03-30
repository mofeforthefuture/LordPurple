export type OrderStatus =
  | 'pending_verification'
  | 'confirmed'
  | 'rejected';

export interface CartLine {
  suitId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  deliveryAddress: string;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  lines: CartLine[];
  subtotal: number;
  customer: CustomerDetails;
  receiptFileName: string | null;
  receiptMimeType: string | null;
  receiptDataUrl: string | null;
  adminNote?: string;
}
