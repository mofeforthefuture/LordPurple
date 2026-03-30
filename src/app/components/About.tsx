export function About() {
  return (
    <section className="py-32 bg-[#FFFCF5]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Label */}
          <div className="space-y-6">
            <div className="h-[1px] w-24 bg-[#7B3F8F]"></div>
            <p className="text-sm tracking-[0.3em] uppercase text-[#7B3F8F]">The Story</p>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1A1A1A]">
              Crafted for the
              <br />
              <span className="italic text-[#5B2C6F]">Distinguished</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                At Lord Purple Bespoke Wears, we don't just create garments—we architect 
                confidence. Every piece is a testament to meticulous attention to detail, 
                sourced from the world's finest fabrics and shaped by master tailors who 
                understand that true luxury is personal.
              </p>
              <p>
                Our philosophy is simple: a man's wardrobe should reflect his ambition, 
                his character, and his uncompromising standards. From the first consultation 
                to the final stitch, we ensure that every element speaks to your unique essence.
              </p>
              <p className="text-[#7B3F8F] italic">
                Because class is not worn. It's tailored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
