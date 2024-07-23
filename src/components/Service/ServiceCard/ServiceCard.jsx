import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

function ServiceCard({ service }) {
  return (
    <Card
      className={
        "relative w-full max-w-[424px] h-[300px] flex flex-col pt-16 pb-10 justify-center items-center "
      }
    >
      <CardHeader className={"text-[#00f9b9] absolute -top-[40px]  "}>
        <div className="w-[140px] h-[80px] relative  bg-white dark:bg-background justify-center items-center flex">
          <Image
          src={service.img}
          fill
          alt="img"
          priority 
          className="bg-white relative -top-4 z-30"/>
        </div>
      </CardHeader>
      <CardContent className={"text-center"}>
       <CardTitle className="mb-4 text-primary dark:text-[#FED000]">{service.category}</CardTitle>
       <CardDescription className={"text-sm text-gray-700 dark:text-gray-400 mx-auto"}>{service.desc}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
