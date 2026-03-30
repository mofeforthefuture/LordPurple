import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Chukwuemeka Okafor',
    title: 'CEO, Titan Industries',
    quote: 'Lord Purple transformed the way I present myself. The attention to detail is unmatched—every suit feels like it was made for a king.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Adebayo Williams',
    title: 'Creative Director',
    quote: 'From my first fitting to the final product, the experience was impeccable. These aren\'t just clothes; they\'re confidence wrapped in fabric.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ifeanyi Nwosu',
    title: 'Senior Partner, Law Firm',
    quote: 'In my line of work, first impressions matter. Lord Purple ensures I always make the right one. Exceptional craftsmanship, every time.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-[#7B3F8F] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A]">
            Trusted by <span className="italic text-[#5B2C6F]">Gentlemen</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-10 bg-white border border-gray-200 hover:border-[#7B3F8F]/30 hover:shadow-2xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xl text-[#1A1A1A] mb-1">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 tracking-wide">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
