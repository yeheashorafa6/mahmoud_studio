"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";

function Pagination({ count }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 4;

  const hasPrev = page > 1;
  const hasNext = ITEM_PER_PAGE * page < count;

  const handleChangePage = (type) => {
    if (type === "prev" && hasPrev) {
      params.set("page", (page - 1).toString());
    } else if (type === "next" && hasNext) {
      params.set("page", (page + 1).toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full mx-auto flex justify-between items-center">
      <button
        className="p-3 rounded-3xl flex items-center disabled:bg-gray-400 disabled:text-white/50 disabled:cursor-default gap-x-2 bg-primary text-white cursor-pointer"
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Prev
        <GrChapterPrevious/>
      </button>
      <button
        className="p-3 rounded-3xl cursor-pointer disabled:bg-gray-400 disabled:text-white/50 disabled:cursor-default flex items-center gap-x-2 bg-primary text-white"
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
        <GrChapterNext/>
      </button>
    </div>
  );
}

export default Pagination;
