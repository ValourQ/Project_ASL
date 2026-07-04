import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import About from "../components/home/About";
import CTA from "../components/home/CTA";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";
import "../styles/LandingPage.css";

function LandingPage() {

  useEffect(() => {
    document.body.classList.remove("dark");
  }, []);
  
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;