import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collection } from './components/Collection';
import { WhyChoose } from './components/WhyChoose';
import { Testimonials } from './components/Testimonials';
import { BookingCTA } from './components/BookingCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <About />
      <Collection />
      <WhyChoose />
      <Testimonials />
      <BookingCTA />
      <Footer />
    </div>
  );
}
