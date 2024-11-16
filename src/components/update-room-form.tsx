"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Picture {
  picId: string;
  picLink: string;
}

interface PlaceData {
  placeId: string;
  placeName: string;
  placeDesc: string;
  placeCapacity: number;
  placeType: string;
  picture: Picture[];
}

interface Props {
  placeData: PlaceData | null;
}

const RoomFormUpdate = ({ placeData }: Props) => {
  const pictures = placeData?.picture || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  //NEXT
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  //PREVIOUS
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length
    );
  };

  if (pictures.length === 0) {
    return <p>No pictures available</p>;
  }

  return (
    <>

        <div className="bg-white mx-auto max-w-[80%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff]">

            <div className="relative w-full h-[400px] overflow-hidden">

                <Image
                src={pictures[currentIndex].picLink}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-cover rounded-lg"
                priority
                />

                {/* Left Arrow */}
                <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-950 text-white p-2 rounded-full"
                >
                &#8592;
                </button>

                {/* Right Arrow */}
                <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-950 text-white p-2 rounded-full"
                >
                &#8594;
                </button>

            </div>
        </div>
    
        <div className="p-5 bg-white mx-auto max-w-[80%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff]">
            <form>
                <label
                htmlFor="placeName"
                className="text-md font-medium text-gray-800 mr-2 text-xl"
                >
                Place Name
                </label>
                <input
                defaultValue={placeData?.placeName}
                id="placeName"
                type="text"
                name="placeName"
                className="text-lg font-bold text-blue-950 border-l-2 border-l-blue-900 py-1 px-2  
                bg-blue-50 rounded-md rounded-l-none w-full mt-1 h-14 focus:outline-none focus:border-l-green-600
                focus:bg-green-50"/>
            </form>
        </div>
    </>
    
  );
};

export default RoomFormUpdate;
