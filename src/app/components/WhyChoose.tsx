import { Scissors, Sparkles, Award, Crown } from 'lucide-react';

const features = [
  {
    icon: Scissors,
    title: 'Custom Fitting',
    description: 'Precision measurements and multiple fittings ensure a perfect silhouette that enhances your natural form.',
  },
  {
    icon: Sparkles,
    title: 'Premium Fabrics',
    description: 'Sourced from Italian mills and British weavers, our fabrics represent the pinnacle of textile craftsmanship.',
  },
  {
    icon: Award,
    title: 'Sharp Finishing',
    description: 'Every buttonhole, every seam, every detail is executed with surgical precision by master tailors.',
  },
  {
    icon: Crown,
    title: 'Luxury Experience',
    description: 'From consultation to delivery, we offer a personalized journey befitting those who demand excellence.',
  },
];

export function WhyChoose() {
  return (
    <section className="py-32 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">The Difference</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">
            Why Choose <span className="text-[#9B7CB9]">Lord Purple</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-[#242424] hover:bg-[#2A2A2A] border border-[#333333] hover:border-[#7B3F8F] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-[#7B3F8F]/10 group-hover:bg-[#7B3F8F]/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>

                {/* Title */}
                <h3 className="text-2xl mb-4 text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
