import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1770283555098-e152e212fec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zd2VhciUyMHN1aXQlMjB0YWlsb3Jpbmd8ZW58MXx8fHwxNzc0ODU5MTUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury tailored menswear"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white">
        <div className="max-w-3xl">
          {/* Brand Mark */}
          <div className="mb-8">
            <div className="inline-block px-4 py-2 border border-[#D4AF37]/40 bg-black/20 backdrop-blur-sm">
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Lord Purple</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.05] tracking-tight">
            Bespoke Elegance,
            <br />
            <span className="text-[#9B7CB9]">Tailored for Kings</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl leading-relaxed">
            Where precision meets prestige. Every stitch tells a story of craftsmanship, 
            every fit celebrates your distinction.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#7B3F8F] hover:bg-[#5B2C6F] text-white transition-all duration-300 group"
            >
              <span className="text-lg tracking-wide">Book a Fitting</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/5 text-white backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-lg tracking-wide">Shop suits</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
