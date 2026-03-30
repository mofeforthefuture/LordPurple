import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, Instagram } from 'lucide-react';

export function BookingCTA() {
  return (
    <section id="booking" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1755224928593-352eeada6db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFicmljJTIwdGV4dHVyZSUyMGNsb3NlLXVwfGVufDF8fHx8MTc3NDg1OTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Premium fabric texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B2C6F]/95 via-[#7B3F8F]/90 to-black/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-white">
        <div className="inline-block px-4 py-2 border border-[#D4AF37]/40 bg-black/20 backdrop-blur-sm mb-8">
          <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Book Your Experience</span>
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
          Ready to Experience
          <br />
          <span className="text-[#D4AF37]">True Bespoke?</span>
        </h2>

        <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Schedule a private consultation with our master tailors. Let us create 
          something extraordinary—something that's unmistakably you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-white hover:bg-gray-100 text-[#5B2C6F] transition-all duration-300 group"
          >
            <MessageCircle className="mr-3 w-5 h-5" />
            <span className="text-lg tracking-wide">WhatsApp Consultation</span>
          </a>
          <a
            href="https://instagram.com/lordpurplebespoke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/40 hover:border-[#D4AF37] hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300"
          >
            <Instagram className="mr-3 w-5 h-5" />
            <span className="text-lg tracking-wide">Follow on Instagram</span>
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-12 border-t border-white/20">
          <p className="text-sm tracking-[0.2em] uppercase text-gray-300 mb-4">Visit Our Atelier</p>
          <p className="text-lg text-white">
            Victoria Island, Lagos, Nigeria
            <br />
            <span className="text-gray-300">Monday – Saturday: 10:00 AM – 7:00 PM</span>
          </p>
        </div>
      </div>
    </section>
  );
}
