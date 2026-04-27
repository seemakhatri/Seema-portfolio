import "./App.css";
import About from "./components/About";
import ArtGallery from "./components/ArtGallery";
import Contact from "./components/Contact";
import DeepOcean from "./components/DeepOcean";
import GitHubRepos from "./components/GitHubRepos";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/SkillsCarousel";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <DeepOcean />
      <Skills />
      <Projects />
      <ArtGallery />
      <GitHubRepos />
      <Contact />
    </>
  );
}

export default App;
