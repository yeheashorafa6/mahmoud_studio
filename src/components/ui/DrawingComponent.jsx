"use client"
import { useState, useEffect } from 'react';

const DrawingComponent = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLabtop, setIsLabtop] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.pageX, y: e.pageY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setIsLabtop(window.innerWidth > 991);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <>
    {
      isLabtop &&  
      <div>
      <div id="marks">
        <span
          className="mark"
          style={{
            top: mousePos.y - 10,
            left: mousePos.x - 10,
            zIndex:"9999",
            position: 'absolute',
            background: '#FED000',
            borderRadius: '50px',
            width: '10px',
            height: '10px',
            display: 'inline-block',
            transition: 'transform .1s ease-in-out',
            pointerEvents: 'none' 
          }}
        ></span>
      </div>
      <style jsx>{`
        .mark {
          transition: transform .1s ease-in-out;
        }
      `}</style>
    </div>
    }
    </>
  );
};

export default DrawingComponent;
