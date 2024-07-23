import { TabsList, TabsTrigger, Tabs, TabsContent } from "@radix-ui/react-tabs";
import { qualificationData } from "../../../../data";
import PersonContent from "./PersonContent";
import QualificationContent from "./QualificationContent";
import SkillsContent from "./SkillsContent";

function AboutTabs() {
  const item = [
    { value: "personal", name: "Personal Info" },
    { value: "qualification", name: "Qualification" },
    { value: "skills", name: "Skills" },
  ];

  return (
    <Tabs defaultValue={"personal"}>
      <TabsList className="w-full h-full grid grid-cols-3 xl:max-w-[640px] bg-white dark:bg-black mb-12 lg:border  justify-center items-center p-1 text-muted-foreground rounded-[30px] ">
        {item.map((item, index) => (
          <TabsTrigger
            value={item.value}
            key={index}
            className="text-primary capitalize w-[120px] sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm md:text-base ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FB3278]  data-[state=active]:text-white dark:data-[state=active]:text-black data-[state=active]:shadow-sm h-[40px] sm:h-[48px]"
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="text-sm md:text-lg mt-8 md:mt-12 gap-5 mx-auto">
        <TabsContent value="personal" >
          <PersonContent />
        </TabsContent>
        <TabsContent value="qualification">
          <QualificationContent />
        </TabsContent>
        <TabsContent value="skills" className="mr-0 lg:mr-[20rem] w-full">
          <SkillsContent />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default AboutTabs;
