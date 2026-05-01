import "./App.css";
import About from "./components/About";
import ArtGallery from "./components/ArtGallery";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Blog from "./components/Blog";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <ArtGallery />
      <Blog />
      <Contact />
    </>
  );
}

export default App;
