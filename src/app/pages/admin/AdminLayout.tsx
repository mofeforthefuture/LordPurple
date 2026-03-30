import { Outlet, Link, useNavigate } from 'react-router';
import { LayoutDashboard, LogOut } from 'lucide-react';

import { logoutAdmin } from '../../lib/adminSession';

export function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      <aside className="md:w-56 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
        <div className="p-6 border-b border-white/10">
          <p className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase">Lord Purple</p>
          <p className="text-lg font-medium mt-1">Admin</p>
        </div>
        <nav className="p-4 flex md:flex-col gap-2">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/5 rounded-md"
          >
            <LayoutDashboard className="w-4 h-4" />
            Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white w-full"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
