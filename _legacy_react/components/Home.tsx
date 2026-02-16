import React from 'react';
import Hero from './Hero';
import Problem from './Problem';
import Services from './Services';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import VideoSection from './VideoSection';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Problem />
      <Services /> 
      <Portfolio />
      <VideoSection />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;