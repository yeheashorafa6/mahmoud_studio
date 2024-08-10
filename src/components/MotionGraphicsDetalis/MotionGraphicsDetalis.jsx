import Image from "next/image";
import React from "react";

function MotionGraphicsDetalis({ motion }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {motion.media.map((item, idx) => (
        <div key={idx} style={{ margin: "10px", flex: "0 0 50%" }}>
          {item.type === "image" ? (
            <img
              src={item.url}
              
              alt="media"
              priority
            />
          ) : (
            <div className="">
              <video className="m-2 w-full h-full " controls>
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MotionGraphicsDetalis;
