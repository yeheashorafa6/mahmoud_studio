'use server'

import { incrementWeeklyVisit } from "@/lib/data";

export async function incrementVisit() {
  const currentDay = new Date().toLocaleString("en-US", { weekday: "short" });
  await incrementWeeklyVisit(currentDay);
}