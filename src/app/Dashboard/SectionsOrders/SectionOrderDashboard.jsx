"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { updateSectionOrder } from "@/lib/action";

const sectionNamesArabic = {
  Hero: "الرئيسية",
  About: "من نحن",
  OurService: "خدماتنا",
  LatestProjects: "أحدث المشاريع",
  ReviewsSec: "التقييمات",
  Coustome: "مخصص",
  Contact: "اتصل بنا",
};

const SectionOrderDashboard = ({ initialSections }) => {
  const [items, setItems] = useState(
    initialSections.map((section) => ({
      id: section._id.toString(),
      content: section.componentName,
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);

    setIsLoading(true);
    setError(null);

    try {
      const orderedIds = newItems.map((item) => item.id);
      await updateSectionOrder(orderedIds);
    } catch (err) {
      console.error("Error updating section order:", err);
      setError("حدث خطأ أثناء تحديث الترتيب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-right">
        ترتيب أقسام الصفحة الرئيسية
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right">
          {error}
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white p-4 mb-2 rounded shadow flex items-center justify-between transition-colors ${
                        snapshot.isDragging ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-black">{index + 1}</span>
                      <span className="flex-grow text-black text-right mr-4">
                        {sectionNamesArabic[item.content] || item.content}
                      </span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isLoading && (
        <div className="text-center mt-4 text-gray-600">
          جارٍ حفظ الترتيب...
        </div>
      )}
    </div>
  );
};

export default SectionOrderDashboard;
