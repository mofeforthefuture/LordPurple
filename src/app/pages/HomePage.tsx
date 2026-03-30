import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Collection } from '../components/Collection';
import { WhyChoose } from '../components/WhyChoose';
import { Testimonials } from '../components/Testimonials';
import { BookingCTA } from '../components/BookingCTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Collection />
      <WhyChoose />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
