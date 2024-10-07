import React from "react";
import { fetchSections } from "@/lib/data";
import SectionOrderDashboard from "./SectionOrderDashboard";

async function SectionsOrder() {
  const initialData = await fetchSections();

  const sectionData = JSON.parse(JSON.stringify(initialData));

  // للتأكد من وجود البيانات
  // console.log("Fetched sections bla bla blab blba :", sectionData);

  if (!sectionData || sectionData.length === 0) {
    return <div>جاري تحميل الأقسام...</div>;
  }

  return (
    <div>
      <SectionOrderDashboard initialSections={sectionData} />
    </div>
  );
}

export default SectionsOrder;
