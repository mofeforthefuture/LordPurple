import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 text-center text-white">
      <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">404</p>
      <h1 className="text-3xl md:text-4xl mb-4">This page is not in the collection</h1>
      <p className="text-gray-400 mb-10 max-w-md">
        The route you requested does not exist. Return home or browse the suit gallery.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-[#7B3F8F] hover:bg-[#5B2C6F] transition-colors"
        >
          Back to home
        </Link>
        <Link
          to="/gallery"
          className="inline-flex items-center justify-center px-8 py-3 border border-white/30 hover:border-[#D4AF37] transition-colors"
        >
          Shop suits
        </Link>
      </div>
    </div>
  );
}
