"use client";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioCard = ({ audio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        setProgress((currentTime / duration) * 100);
      }
    };

    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  return (
    <div className="mx-auto bg-primary rounded-xl shadow-md overflow-hidden w-full max-w-md">
      <div className="p-4 flex flex-col h-full justify-between">
        <div className="flex justify-end items-center">
          <span className="text-gray-100">{audio.tag}</span>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-white">
            {audio.title}
          </h2>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <button
            className="text-white bg-[#00F9B9] rounded-full p-3"
            onClick={togglePlayPause}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <div className="w-full bg-gray-300 rounded-full h-3 relative">
            <div
              className="bg-[#00F9B9] h-3 rounded-full absolute"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-white">
            {audioRef.current ? `${Math.floor(audioRef.current.currentTime / 60)}:${Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, "0")}` : "00:00"}
          </span>
        </div>
        <audio ref={audioRef} src={audio.audio} />
      </div>
    </div>
  );
};

export default AudioCard;
