import React from "react";
import Image from "next/image";
import Link from "next/link";

function MotionCard({ motion ,isMotionGraphics }) {
  // ابحث عن أول صورة في المصفوفة
  const firstImage = motion.media.find(mediaItem => mediaItem.type === "image");

  return (
    <Link href={`/Projects/${motion._id}${isMotionGraphics ? '?type=motion' : ''}`}>
      <div className="relative group h-full p-10 bg-background overflow-hidden rounded-3xl shadow-none dark:shadow-white/20 lg:shadow-2xl transition hover:shadow-lg">
        {
          firstImage &&
          <Image
            alt={motion.title}
            src={firstImage.url}
            fill
            className="absolute rounded-3xl inset-0 h-full w-full object-cover opacity-90 dark:opacity-75 transition-opacity group-hover:opacity-50"
          />
        }

        <div className="relative p-2 sm:p-6 lg:p-8 cursor-pointer">
          <div className="mt-24 cursor-pointer">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <h4 className="text-sm font-medium uppercase tracking-widest text-primary">Motion graphics</h4>
              <h2 className="text-lg font-bold text-gray-800 dark:text-zinc-300 sm:text-2xl">{motion.title}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MotionCard;
