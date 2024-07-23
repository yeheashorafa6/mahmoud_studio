import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Hero from "@/components/Hero/Hero";
import Reviews from "@/components/Reviews/Reviews";
import Service from "@/components/Service/Service";
import "./fontStyle.css"
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import OurCustomers from "@/components/OurCustomers/OurCustomers";
import LatestProjects from "@/components/Projects/LatestProjects";
import SliderSec from "@/components/Slider/SliderSec";
import ReviewsSec from "@/components/Reviews/ReviewsSec";
import OurService from "@/components/Service/OurService";
import Coustome from "@/components/OurCustomers/Coustome";
export default function Home() {
  
  return (
    <>

    {/* SLIDER SECTION */}
    <SliderSec/>
    {/* == SLIDER SECTION == */}

    {/* HERO SECTION */}
      <Hero/>
    {/* == HERO SECTION == */}

    {/* HERO SECTION */}
    <About/>
    {/* == HERO SECTION == */}

    {/* SERVICE SECTION */}
    <OurService/>
    {/* == SERVICE SECTION == */}

    {/* PROJECTS SECTION */}
    <LatestProjects/>
    {/* == PROJECTS SECTION == */}

    {/* REVIEWS SECTION */}
    <ReviewsSec/>
    {/* == REVIEWS SECTION == */}

    {/* OUR CUSTOMERS SECTION */}
    <Coustome/>
    {/* == OUR CUSTOMERS SECTION == */}

    {/* PROJECTS SECTION */}
    <Contact/>
    {/* == PROJECTS SECTION == */}

    <ScrollToTopButton />
   
    </>
  );
}
