import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 border border-[#D4AF37]/40 bg-[#D4AF37]/5">
              <span className="text-[#D4AF37] text-lg tracking-[0.3em] uppercase">Lord Purple</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bespoke menswear for the distinguished. Where precision meets prestige, 
              and every garment is a masterpiece.
            </p>
            <div className="pt-4">
              <p className="text-sm text-[#D4AF37] italic">
                "Class is not worn. It's tailored."
              </p>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-xl tracking-wide text-white mb-6">Contact</h3>
            <div className="space-y-4 text-gray-400">
              <p>
                <span className="text-white block mb-1">Address</span>
                Victoria Island, Lagos
                <br />
                Nigeria
              </p>
              <p>
                <span className="text-white block mb-1">Phone</span>
                +234 801 234 5678
              </p>
              <p>
                <span className="text-white block mb-1">Email</span>
                info@lordpurplebespoke.com
              </p>
            </div>
          </div>

          {/* Hours & Social Column */}
          <div className="space-y-6">
            <h3 className="text-xl tracking-wide text-white mb-6">Opening Hours</h3>
            <div className="space-y-3 text-gray-400">
              <p>Monday – Friday: 10:00 AM – 7:00 PM</p>
              <p>Saturday: 10:00 AM – 5:00 PM</p>
              <p>Sunday: By Appointment Only</p>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-white mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/lordpurplebespoke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-[#7B3F8F] hover:bg-[#7B3F8F] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/lordpurplebespoke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-[#7B3F8F] hover:bg-[#7B3F8F] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/lordpurplebespoke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-[#7B3F8F] hover:bg-[#7B3F8F] transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#333333]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2026 Lord Purple Bespoke Wears. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
