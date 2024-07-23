"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";

function PaginationComponent({ count, page, itemsPerPage, onPageChange }) {
  const hasPrev = page > 1;
  const hasNext = itemsPerPage * page < count;

  return (
    <div className="w-full mx-auto flex justify-between items-center">
      <button
        className="p-3 rounded-3xl flex items-center disabled:bg-gray-400 disabled:text-white/50 disabled:cursor-default gap-x-2 bg-primary text-white cursor-pointer"
        disabled={!hasPrev}
        onClick={() => onPageChange("prev")}
      >
        Prev
        <GrChapterPrevious/>
      </button>
      <button
        className="p-3 rounded-3xl cursor-pointer disabled:bg-gray-400 disabled:text-white/50 disabled:cursor-default flex items-center gap-x-2 bg-primary text-white"
        disabled={!hasNext}
        onClick={() => onPageChange("next")}
      >
        Next
        <GrChapterNext/>
      </button>
    </div>
  );
}

export default PaginationComponent;
