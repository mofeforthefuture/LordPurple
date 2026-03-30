import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import App from './app/App.tsx';
import { CartProvider } from './app/context/CartContext.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <>
      <App />
      <Toaster theme="dark" position="top-center" richColors />
    </>
  </CartProvider>,
);
  