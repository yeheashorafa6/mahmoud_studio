import React from "react";

function SkeletonProdect() {
  return (
    <>
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse mb-3"></div>
      <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mb-3"></div>
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse mb-3"></div>
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse mb-3"></div>
      <div className="h-[20px] w-[100px] bg-slate-200 animate-pulse mb-3"></div>
    </>
  );
}

export default SkeletonProdect;
