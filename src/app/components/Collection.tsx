import { ImageWithFallback } from './figma/ImageWithFallback';

const collections = [
  {
    id: 1,
    title: 'Signature Suits',
    description: 'Three-piece mastery in premium wool',
    image: 'https://images.unsplash.com/photo-1770452603217-89b4f03e8271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmxhY2slMjBtYW4lMjBmb3JtYWwlMjBzdWl0fGVufDF8fHx8MTc3NDg1OTE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Bespoke Blazers',
    description: 'Structured elegance for every occasion',
    image: 'https://images.unsplash.com/photo-1515736076039-a3ca66043b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXNwb2tlJTIwc3VpdCUyMGJsYXplciUyMGRldGFpbHxlbnwxfHx8fDE3NzQ4NTkxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Formal Excellence',
    description: 'Timeless pieces for distinguished events',
    image: 'https://images.unsplash.com/photo-1774095906774-3ac476493d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW4lMjBmb3JtYWwlMjB3ZWFyfGVufDF8fHx8MTc3NDg1OTE1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Native Couture',
    description: 'Heritage meets haute tailoring',
    image: 'https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbmF0aXZlJTIwZm9ybWFsJTIwYXR0aXJlfGVufDF8fHx8MTc3NDg1OTE1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Collection() {
  return (
    <section id="collection" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">The Collection</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">Featured Looks</h2>
        </div>

        {/* Collection Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden cursor-pointer aspect-[3/4]"
            >
              {/* Image */}
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="w-12 h-[1px] bg-[#D4AF37] mb-4 group-hover:w-24 transition-all duration-500"></div>
                <h3 className="text-3xl mb-2">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
