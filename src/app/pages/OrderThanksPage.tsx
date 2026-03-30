import { Link, useParams } from 'react-router';

import { getOrderById } from '../lib/ordersStorage';
import { formatPrice } from '../data/suits';

export function OrderThanksPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const decoded = orderId ? decodeURIComponent(orderId) : '';
  const order = decoded ? getOrderById(decoded) : undefined;

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center text-white">
        <h1 className="text-2xl mb-4">Order not found</h1>
        <p className="text-gray-400 mb-8">This confirmation link may be invalid on this device.</p>
        <Link to="/gallery" className="text-[#D4AF37] hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-white text-center">
      <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">Thank you</p>
      <h1 className="text-3xl md:text-4xl mb-4">We received your order</h1>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Our team will verify your bank transfer against the receipt you uploaded. You will hear from
        us at <span className="text-white">{order.customer.email}</span> or on{' '}
        <span className="text-white">{order.customer.phone}</span>.
      </p>

      <div className="border border-white/15 bg-[#0d0d0d] p-8 text-left mb-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-2">Order ID</p>
        <p className="text-2xl font-mono text-[#D4AF37] mb-6">{order.id}</p>
        <p className="text-sm text-gray-400 mb-1">Amount</p>
        <p className="text-xl">{formatPrice(order.subtotal)}</p>
        <p className="text-xs text-gray-500 mt-6">
          Status: <span className="text-amber-200">Pending verification</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/gallery"
          className="inline-flex justify-center px-8 py-3 border border-white/30 hover:border-[#D4AF37]"
        >
          Shop more
        </Link>
        <Link to="/" className="inline-flex justify-center px-8 py-3 bg-[#7B3F8F] hover:bg-[#5B2C6F]">
          Home
        </Link>
      </div>
    </div>
  );
}
