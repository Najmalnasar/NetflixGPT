import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[20%] px-16 absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-2 text-lg w-1/3">{overview}</p>
      <div>
        <button
          className="bg-white text-black p-2 px-10 text-xl  rounded-md hover:bg-opacity-70
        "
        >
          ▶Play
        </button>
        <button className="bg-gray-500 text-black p-2 px-8 text-xl mx-2 rounded-md bg-opacity-50">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
