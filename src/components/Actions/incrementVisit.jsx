"use server";

import { incrementWeeklyVisit } from "@/lib/action";


export async function incrementVisit() {
  const currentDay = new Date().toLocaleString("en-US", { weekday: "short" });
  console.log("Current day:", currentDay); 
  await incrementWeeklyVisit(currentDay);
}
