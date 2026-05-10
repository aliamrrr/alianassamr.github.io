import Cursor from './components/Cursor.jsx';
import Chatbot from './components/Chatbot.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Achievements from './components/Achievements.jsx';
import Marquee from './components/Marquee.jsx';
import Testimonials from './components/Testimonials.jsx';
import Interests from './components/Interests.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Cursor />
      <Chatbot />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Education />
        <Achievements />
        <Testimonials />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
