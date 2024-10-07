// ملف: app/page.js (الصفحة الرئيسية)
import dynamic from 'next/dynamic';
import SliderSec from "@/components/Slider/SliderSec";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import { incrementVisit } from "@/components/Actions/incrementVisit";
import { fetchSections } from '@/lib/data';

// استيراد المكونات بشكل ديناميكي
const componentMap = {
  Hero: dynamic(() => import("@/components/Hero/Hero")),
  About: dynamic(() => import("@/components/About/About")),
  OurService: dynamic(() => import("@/components/Service/OurService")),
  LatestProjects: dynamic(() => import("@/components/Projects/LatestProjects")),
  ReviewsSec: dynamic(() => import("@/components/Reviews/ReviewsSec")),
  Coustome: dynamic(() => import("@/components/OurCustomers/Coustome")),
  Contact: dynamic(() => import("@/components/Contact/Contact"))
};

export default async function Home() {
  await incrementVisit();
  const sections = await fetchSections();

  return (
    <>
      <SliderSec />
      
      {sections.map((section) => {
        const Component = componentMap[section.componentName];
        return Component ? <Component key={section._id} /> : null;
      })}

      <ScrollToTopButton />
    </>
  );
}