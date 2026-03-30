import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { format } from 'date-fns';

import { getAllOrders } from '../../lib/ordersStorage';
import type { OrderStatus } from '../../types/commerce';
import { formatPrice } from '../../data/suits';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending_verification: 'Pending',
  confirmed: 'Confirmed',
  rejected: 'Rejected',
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending_verification: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  confirmed: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  rejected: 'bg-red-500/20 text-red-200 border-red-500/40',
};

type Filter = 'all' | OrderStatus;

export function AdminDashboardPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const orders = getAllOrders();

  const filtered = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending_verification').length,
      confirmed: orders.filter((o) => o.status === 'confirmed').length,
    };
  }, [orders]);

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <h1 className="text-2xl md:text-3xl mb-2">Orders</h1>
      <p className="text-gray-500 text-sm mb-8">Bank transfer &amp; receipt verification queue</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="border border-white/10 p-4 bg-[#111]">
          <p className="text-xs uppercase tracking-wider text-gray-500">Total</p>
          <p className="text-2xl text-white mt-1">{stats.total}</p>
        </div>
        <div className="border border-white/10 p-4 bg-[#111]">
          <p className="text-xs uppercase tracking-wider text-gray-500">Pending review</p>
          <p className="text-2xl text-amber-200 mt-1">{stats.pending}</p>
        </div>
        <div className="border border-white/10 p-4 bg-[#111]">
          <p className="text-xs uppercase tracking-wider text-gray-500">Confirmed</p>
          <p className="text-2xl text-emerald-200 mt-1">{stats.confirmed}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'pending_verification', 'confirmed', 'rejected'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={
              filter === key
                ? 'px-3 py-1.5 text-xs uppercase tracking-wider border border-[#D4AF37] text-[#D4AF37]'
                : 'px-3 py-1.5 text-xs uppercase tracking-wider border border-white/20 text-gray-400 hover:border-white/40'
            }
          >
            {key === 'all' ? 'All' : STATUS_LABEL[key]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 py-12 border border-dashed border-white/20 text-center">
          No orders in this view.
        </p>
      ) : (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#111]">
                <th className="p-3 font-medium text-gray-400">Order</th>
                <th className="p-3 font-medium text-gray-400">Customer</th>
                <th className="p-3 font-medium text-gray-400">Amount</th>
                <th className="p-3 font-medium text-gray-400">Status</th>
                <th className="p-3 font-medium text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-3">
                    <Link
                      to={`/admin/orders/${encodeURIComponent(o.id)}`}
                      className="font-mono text-[#D4AF37] hover:underline"
                    >
                      {o.id}
                    </Link>
                  </td>
                  <td className="p-3">
                    <div>{o.customer.fullName}</div>
                    <div className="text-gray-500 text-xs">{o.customer.email}</div>
                  </td>
                  <td className="p-3 tabular-nums">{formatPrice(o.subtotal)}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs border rounded ${STATUS_STYLE[o.status]}`}
                    >
                      {STATUS_LABEL[o.status]}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">
                    {format(new Date(o.createdAt), 'MMM d, yyyy HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
