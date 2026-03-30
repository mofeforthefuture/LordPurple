import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useCart } from '../context/CartContext';
import { PAYMENT_INSTRUCTIONS } from '../data/payment';
import { formatPrice } from '../data/suits';
import { saveOrder } from '../lib/ordersStorage';
import type { CustomerDetails, Order } from '../types/commerce';

const RECEIPT_MAX_BYTES = 2 * 1024 * 1024;

type FormValues = CustomerDetails;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clearCart } = useCart();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<{ dataUrl: string; name: string; type: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      deliveryAddress: '',
      notes: '',
    },
  });

  if (lines.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function onReceiptChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setReceiptFile(null);
    setReceiptPreview(null);
    if (!file) return;

    if (file.size > RECEIPT_MAX_BYTES) {
      toast.error('Receipt must be under 2 MB.');
      e.target.value = '';
      return;
    }

    const okType =
      file.type.startsWith('image/') || file.type === 'application/pdf';
    if (!okType) {
      toast.error('Upload a photo or PDF of your transfer receipt.');
      e.target.value = '';
      return;
    }

    setReceiptFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      setReceiptPreview({
        dataUrl,
        name: file.name,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  }

  const onSubmit = async (data: FormValues) => {
    if (!receiptPreview) {
      toast.error('Please upload your payment receipt.');
      return;
    }

    setSubmitting(true);
    try {
      const id = `LP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      const order: Order = {
        id,
        createdAt: new Date().toISOString(),
        status: 'pending_verification',
        lines: lines.map((l) => ({ ...l })),
        subtotal,
        customer: {
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          city: data.city.trim(),
          deliveryAddress: data.deliveryAddress.trim(),
          notes: data.notes?.trim() || undefined,
        },
        receiptFileName: receiptPreview.name,
        receiptMimeType: receiptPreview.type,
        receiptDataUrl: receiptPreview.dataUrl,
      };
      saveOrder(order);
      clearCart();
      toast.success('Order submitted. We will confirm after verifying your payment.');
      navigate(`/order/${encodeURIComponent(id)}/thanks`, { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-white">
      <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-2">Checkout</p>
      <h1 className="text-3xl md:text-4xl mb-10">Payment &amp; details</h1>

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <div className="border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Bank transfer</p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Bank</dt>
                <dd>{PAYMENT_INSTRUCTIONS.bankName}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Account name</dt>
                <dd>{PAYMENT_INSTRUCTIONS.accountName}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Account number</dt>
                <dd className="text-xl tracking-widest font-mono">{PAYMENT_INSTRUCTIONS.accountNumber}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Amount due</dt>
                <dd className="text-2xl text-[#D4AF37]">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">{PAYMENT_INSTRUCTIONS.referenceHint}</p>
          </div>

          <div className="border border-white/10 p-6 text-sm text-gray-400 space-y-2">
            <p>1. Transfer the exact amount above.</p>
            <p>2. Save your bank receipt or screenshot.</p>
            <p>3. Fill in your details and upload the receipt below.</p>
            <p>4. We will confirm your order by email or WhatsApp after verification.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 space-y-6 order-1 lg:order-2"
        >
          <div className="border border-white/10 p-6 space-y-4 bg-[#0a0a0a]">
            <h2 className="text-lg tracking-wide text-white mb-2">Your details</h2>
            <div>
              <Label htmlFor="fullName" className="text-gray-300">
                Full name
              </Label>
              <Input
                id="fullName"
                className="mt-1.5 bg-white/5 border-white/20 text-white"
                {...register('fullName', { required: 'Required' })}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5 bg-white/5 border-white/20 text-white"
                  {...register('email', { required: 'Required' })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Phone (WhatsApp)
                </Label>
                <Input
                  id="phone"
                  className="mt-1.5 bg-white/5 border-white/20 text-white"
                  {...register('phone', { required: 'Required' })}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="city" className="text-gray-300">
                City
              </Label>
              <Input
                id="city"
                className="mt-1.5 bg-white/5 border-white/20 text-white"
                {...register('city', { required: 'Required' })}
              />
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="deliveryAddress" className="text-gray-300">
                Delivery / pickup address
              </Label>
              <Textarea
                id="deliveryAddress"
                className="mt-1.5 bg-white/5 border-white/20 text-white min-h-[100px]"
                {...register('deliveryAddress', { required: 'Required' })}
              />
              {errors.deliveryAddress && (
                <p className="text-red-400 text-xs mt-1">{errors.deliveryAddress.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="notes" className="text-gray-300">
                Notes (optional)
              </Label>
              <Textarea
                id="notes"
                className="mt-1.5 bg-white/5 border-white/20 text-white min-h-[80px]"
                placeholder="Measurements preferences, event date, etc."
                {...register('notes')}
              />
            </div>
          </div>

          <div className="border border-white/10 p-6 bg-[#0a0a0a]">
            <Label htmlFor="receipt" className="text-gray-300">
              Payment receipt <span className="text-red-400">*</span>
            </Label>
            <Input
              id="receipt"
              type="file"
              accept="image/*,application/pdf"
              onChange={onReceiptChange}
              className="mt-2 bg-white/5 border-white/20 text-white file:mr-4 file:bg-[#7B3F8F] file:border-0 file:px-4 file:py-2 file:text-white"
            />
            {receiptPreview && receiptPreview.type.startsWith('image/') && (
              <div className="mt-4 max-w-xs border border-white/20">
                <img src={receiptPreview.dataUrl} alt="Receipt preview" className="w-full h-auto" />
              </div>
            )}
            {receiptPreview && receiptPreview.type === 'application/pdf' && (
              <p className="mt-4 text-sm text-gray-400">PDF attached: {receiptPreview.name}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">Max 2 MB. JPG, PNG, or PDF.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center pt-2">
            <Link to="/cart" className="text-sm text-[#9B7CB9] hover:text-[#D4AF37]">
              ← Back to cart
            </Link>
            <button
              type="submit"
              disabled={submitting || !receiptFile}
              className="inline-flex justify-center px-10 py-4 bg-[#7B3F8F] hover:bg-[#5B2C6F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting…' : 'Submit order'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12 border border-white/10 p-6">
        <h2 className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-4">Order summary</h2>
        <ul className="space-y-3 mb-4">
          {lines.map((l) => (
            <li key={l.suitId} className="flex gap-3 text-sm">
              <div className="w-12 h-14 shrink-0 overflow-hidden">
                <ImageWithFallback src={l.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span>{l.name}</span>
                <span className="text-gray-500"> × {l.quantity}</span>
              </div>
              <span className="tabular-nums">{formatPrice(l.price * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="text-right text-lg text-[#D4AF37]">{formatPrice(subtotal)}</p>
      </div>
    </div>
  );
}
