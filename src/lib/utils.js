import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


let connection = {}; 

export const connectToDb = async () => {
  try {
    // التحقق من حالة الاتصال
    if (connection.isConnected) {
      console.log("Succeeded to connect");
      return;
    }

    // الاتصال بقاعدة البيانات
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed to connect to DB:", error);
  }
};
