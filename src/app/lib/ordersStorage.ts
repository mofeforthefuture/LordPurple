import type { Order, OrderStatus } from '../types/commerce';

const ORDERS_KEY = 'lordpurple_orders_v1';

function read(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getAllOrders(): Order[] {
  return read().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | undefined {
  return read().find((o) => o.id === id);
}

export function saveOrder(order: Order): void {
  const orders = read();
  orders.unshift(order);
  write(orders);
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
  adminNote?: string,
): Order | undefined {
  const orders = read();
  const i = orders.findIndex((o) => o.id === id);
  if (i === -1) return undefined;
  orders[i] = {
    ...orders[i],
    status,
    ...(adminNote !== undefined ? { adminNote } : {}),
  };
  write(orders);
  return orders[i];
}
