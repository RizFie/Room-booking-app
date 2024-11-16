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
    
        <div className="bg-white mx-auto max-w-[80%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff]">
            <form>
                
            </form>
        </div>
    </>
    
  );
};

export default RoomFormUpdate;
