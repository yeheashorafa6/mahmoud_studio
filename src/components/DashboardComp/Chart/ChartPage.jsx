import { incrementWeeklyVisit, fetchWeeklyVisit } from "@/lib/data";
import Chart from "./Chart";

async function ChartPage() {
  // جلب البيانات المحدثة
  const weeklyData = await fetchWeeklyVisit();
  console.log("charts page",weeklyData)

  return (
    <div>
      <Chart initialData={weeklyData} />
    </div>
  );
}

export default ChartPage;
