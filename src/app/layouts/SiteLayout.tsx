import { Outlet } from 'react-router';

import { SiteHeader } from '../components/SiteHeader';
import { Footer } from '../components/Footer';

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
