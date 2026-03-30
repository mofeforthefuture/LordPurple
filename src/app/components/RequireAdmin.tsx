import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { isAdminSession } from '../lib/adminSession';

export function RequireAdmin({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (!isAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
