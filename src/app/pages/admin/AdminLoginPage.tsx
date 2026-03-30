import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';

import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { isAdminSession, loginAdmin } from '../../lib/adminSession';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/admin';
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (isAdminSession()) {
    return <Navigate to="/admin" replace />;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    if (loginAdmin(password)) {
      navigate(from, { replace: true });
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md border border-white/15 bg-black p-8 md:p-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-2">Lord Purple</p>
        <h1 className="text-2xl text-white mb-2">Admin</h1>
        <p className="text-sm text-gray-500 mb-8">Orders &amp; payment verification</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="admin-password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 bg-white/5 border-white/20 text-white"
            />
            {error && <p className="text-red-400 text-xs mt-2">Incorrect password.</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#7B3F8F] hover:bg-[#5B2C6F] text-white transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-8 leading-relaxed">
          For production, set <code className="text-gray-400">VITE_ADMIN_PASSWORD</code> in your{' '}
          <code className="text-gray-400">.env</code> file.
        </p>

        <a href="/" className="inline-block mt-6 text-sm text-[#9B7CB9] hover:text-[#D4AF37]">
          ← Back to site
        </a>
      </div>
    </div>
  );
}
