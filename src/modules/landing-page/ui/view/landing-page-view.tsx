import CTABanner from "../components/cta-banner";
import Hero from "../components/hero";
import FAQ from "../components/landing-page-faq";
import Features from "../components/landing-page-features";
import Footer from "../components/landing-page-footer";
import Navbar from "../components/landing-page-navbar";
import Pricing from "../components/pricing";

const LandingPageView = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTABanner />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPageView;
