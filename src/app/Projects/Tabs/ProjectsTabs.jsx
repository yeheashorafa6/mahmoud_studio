"use client"
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import ProjectsCard from "./ProjectsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AudioCard from "@/components/AudioCard/AudioCard";

function ProjectsTabs({projects ,audios}) {
  const uniqueCategory = ["All Projects", ...new Set(projects.map((item) => item.category)), "Audio recordings"];
  const [categories, setCategories] = useState(uniqueCategory);
  const [category, setCategory] = useState("All Projects");
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [Audio, setAudio] = useState(audios);
  // console.log(Audio)
  const tabsToShow = 3;
  const mbtabsToShow = 1;

  const filteredProjects = projects.filter((project) => {
    return category === "All Projects" ? project : project.category === category;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (startIndex + (isMobile ? mbtabsToShow : tabsToShow) < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <Tabs defaultValue={category} onValueChange={(value) => setCategory(value)}>
      <div className="flex justify-center items-center mb-12">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="w-10 h-10 rounded-full p-2 bg-blue-500 text-white flex items-center justify-center disabled:opacity-50 mr-2"
        >
          <ArrowLeft size={20} />
        </button>
        <TabsList className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:max-w-[700px] md:border dark:border-none justify-center items-center xl:bg-white p-1 text-muted-foreground rounded-[30px] dark:md:bg-secondary gap-x-5">
          {categories.slice(startIndex, startIndex + (isMobile ? mbtabsToShow : tabsToShow)).map((cat, index) => (
            <TabsTrigger
              onClick={() => setCategory(cat)}
              value={cat}
              key={index}
              className="capitalize w-[162px] md:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm h-[48px]"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
        <button
          onClick={handleNext}
          disabled={startIndex + (isMobile ? mbtabsToShow : tabsToShow) >= categories.length}
          className="w-10 h-10 rounded-full p-2 bg-blue-500 text-white flex items-center justify-center disabled:opacity-50 ml-2"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="text-lg mt-12 xl:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {!isMobile ? (
          category === "Audio recordings"
            ? 
            Audio.map((audio, index) => (
              <TabsContent value="Audio recordings" key={index} className="">
                <AudioCard audio={audio} />
              </TabsContent>
            ))
            : filteredProjects.map((project, index) => (
              <TabsContent value={category} key={index}>
                <ProjectsCard project={project} />
              </TabsContent>
            ))
        ) : (
          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 2500,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="h-full w-full rounded-lg"
            >
              {category === "Audio recordings"
                ? Audio.map((audio, index) => (
                  <SwiperSlide key={index} className="mb-8">
                    <AudioCard audio={audio} />
                  </SwiperSlide>
                ))
                : filteredProjects.map((project, index) => (
                  <SwiperSlide key={index} className="mb-8">
                    <ProjectsCard project={project} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </div>
    </Tabs>
    
  );
}

export default ProjectsTabs;
