import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { getOrderById, updateOrderStatus } from '../../lib/ordersStorage';
import { CATEGORY_LABELS, SUITS, formatPrice } from '../../data/suits';
import type { OrderStatus } from '../../types/commerce';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending_verification: 'Pending verification',
  confirmed: 'Confirmed',
  rejected: 'Rejected',
};

export function AdminOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const decoded = orderId ? decodeURIComponent(orderId) : '';
  const initial = decoded ? getOrderById(decoded) : undefined;
  const [order, setOrder] = useState(initial);
  const [note, setNote] = useState(initial?.adminNote ?? '');
  const [busy, setBusy] = useState(false);

  if (!order) {
    return (
      <div className="p-10">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/admin" className="text-[#D4AF37] mt-4 inline-block">
          ← Back
        </Link>
      </div>
    );
  }

  function applyStatus(status: OrderStatus) {
    setBusy(true);
    try {
      const updated = updateOrderStatus(order.id, status, note.trim() || undefined);
      if (updated) {
        setOrder(updated);
        toast.success(`Marked as ${STATUS_LABEL[status]}`);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <Link to="/admin" className="text-sm text-gray-500 hover:text-[#D4AF37] mb-8 inline-block">
        ← All orders
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">Order</p>
          <h1 className="text-2xl font-mono text-[#D4AF37] mt-1">{order.id}</h1>
          <p className="text-sm text-gray-500 mt-2">
            {format(new Date(order.createdAt), 'PPpp')}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs border rounded ${
            order.status === 'pending_verification'
              ? 'border-amber-500/40 text-amber-200 bg-amber-500/10'
              : order.status === 'confirmed'
                ? 'border-emerald-500/40 text-emerald-200 bg-emerald-500/10'
                : 'border-red-500/40 text-red-200 bg-red-500/10'
          }`}
        >
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="border border-white/10 p-6 bg-[#111]">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Customer</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd>{order.customer.fullName}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd>
                <a href={`mailto:${order.customer.email}`} className="text-[#9B7CB9] hover:underline">
                  {order.customer.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd>
                <a href={`tel:${order.customer.phone}`} className="text-[#9B7CB9] hover:underline">
                  {order.customer.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">City</dt>
              <dd>{order.customer.city}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Address</dt>
              <dd className="whitespace-pre-wrap">{order.customer.deliveryAddress}</dd>
            </div>
            {order.customer.notes && (
              <div>
                <dt className="text-gray-500">Notes</dt>
                <dd className="whitespace-pre-wrap">{order.customer.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="border border-white/10 p-6 bg-[#111]">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Payment receipt</h2>
          {order.receiptDataUrl && order.receiptMimeType?.startsWith('image/') && (
            <a href={order.receiptDataUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={order.receiptDataUrl}
                alt="Receipt"
                className="w-full max-h-80 object-contain border border-white/10"
              />
            </a>
          )}
          {order.receiptMimeType === 'application/pdf' && (
            <a
              href={order.receiptDataUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline"
            >
              Open PDF receipt
            </a>
          )}
          {order.receiptFileName && (
            <p className="text-xs text-gray-500 mt-2">File: {order.receiptFileName}</p>
          )}
        </div>
      </div>

      <div className="border border-white/10 p-6 mb-10">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Line items</h2>
        <ul className="space-y-4">
          {order.lines.map((line) => (
            <li key={line.suitId} className="flex gap-4">
              <div className="w-16 h-20 shrink-0 overflow-hidden border border-white/10">
                <ImageWithFallback src={line.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{line.name}</p>
                <p className="text-xs text-gray-500">
                  {(() => {
                    const cat = SUITS.find((s) => s.id === line.suitId)?.category;
                    return cat ? CATEGORY_LABELS[cat] : '—';
                  })()}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Qty {line.quantity} × {formatPrice(line.price)}
                </p>
              </div>
              <p className="tabular-nums">{formatPrice(line.price * line.quantity)}</p>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 mt-6 pt-4 flex justify-between text-lg">
          <span className="text-gray-500">Total</span>
          <span className="text-[#D4AF37]">{formatPrice(order.subtotal)}</span>
        </div>
      </div>

      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <h2 className="text-sm uppercase tracking-wider text-gray-500">Internal note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full min-h-[80px] bg-black border border-white/20 px-3 py-2 text-sm text-white"
          placeholder="Optional note (saved with status change)"
        />
        <div className="flex flex-wrap gap-3">
          {order.status !== 'confirmed' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => applyStatus('confirmed')}
              className="px-6 py-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm"
            >
              Confirm payment
            </button>
          )}
          {order.status !== 'rejected' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => applyStatus('rejected')}
              className="px-6 py-2 bg-red-900/80 hover:bg-red-800 disabled:opacity-50 text-white text-sm"
            >
              Reject
            </button>
          )}
          {order.status !== 'pending_verification' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => applyStatus('pending_verification')}
              className="px-6 py-2 border border-white/20 hover:bg-white/5 text-sm"
            >
              Mark pending again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
