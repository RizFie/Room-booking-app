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

        <div className="bg-white mx-auto max-w-[60%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff]">

            <div className="relative w-full h-[400px] overflow-hidden">

                <Image
                src={pictures[currentIndex].picLink}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                />

                {/* Left Arrow */}
                <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-950 text-white p-2 rounded-full transition-all hover:bg-blue-800 hover:shadow-md"
                >
                &#8592;
                </button>

                {/* Right Arrow */}
                <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-950 text-white p-2 rounded-full transition-all hover:bg-blue-800 hover:shadow-md"
                >
                &#8594;
                </button>

            </div>
        </div>
    
        <div className="p-5 bg-white mx-auto max-w-[60%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff]">
            <form>
                <label
                htmlFor="placeName"
                className="text-md font-medium text-gray-700 text-2xl font-sans block"
                >
                Place Name
                </label>
                <input
                defaultValue={placeData?.placeName}
                id="placeName"
                type="text"
                name="placeName"
                className="text-lg font-bold text-blue-950 border-l-[3px] border-l-blue-900 py-1 px-2  
                bg-blue-50 rounded-md rounded-l-none w-full mt-2 h-14 focus:outline-none focus:border-l-green-600
                focus:bg-green-50 focus:text-green-950"/>

                <label
                htmlFor="placeDesc"
                className="text-md font-medium text-gray-700 text-2xl font-sans mt-5 block"
                >
                Description
                </label>
                <textarea
                defaultValue={placeData?.placeDesc}
                maxLength={150}
                id="placeDesc"
                name="placeDesc"
                className="text-lg font-bold text-blue-950 border-[2px] border-blue-900 py-1 px-2  
                bg-blue-50 rounded-md w-full mt-2 h-20 focus:outline-green-600 focus:text-green-950
                focus:bg-green-50 transition-all"/>

                <div className="flex flex-row gap-3 mt-5">
                    <div>
                        <label
                        htmlFor="placeCapacity"
                        className="text-md font-medium text-gray-700 text-2xl font-sans block"
                        >
                        Capacity
                        </label>
                        <input
                        defaultValue={placeData?.placeCapacity}
                        id="placeCapacity"
                        type="text"
                        name="placeCapacity"
                        className="text-lg font-bold text-blue-950 border-l-[3px] border-l-blue-900 py-1 px-2  
                        bg-blue-50 rounded-md rounded-l-none w-full mt-2 h-14 focus:outline-none focus:border-l-green-600
                        focus:bg-green-50 focus:text-green-950"/>
                    </div>
                    <div>
                        <label
                        htmlFor="placeType"
                        className="text-md font-medium text-gray-700 text-2xl font-sans block"
                        >
                        Type
                        </label>
                        <input
                        defaultValue={placeData?.placeType}
                        id="placeType"
                        type="text"
                        name="placeType"
                        className="text-lg font-bold text-blue-950 border-l-[3px] border-l-blue-900 py-1 px-2  
                        bg-blue-50 rounded-md rounded-l-none w-full mt-2 h-14 focus:outline-none focus:border-l-green-600
                        focus:bg-green-50 focus:text-green-950"/>
                    </div>
                </div>
            </form>
        </div>
    </>
    
  );
};

export default RoomFormUpdate;
