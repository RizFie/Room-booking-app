"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";

interface Picture {
    picId: string;
    picLink: string;
  }

const Carousel = ({ placePic }: { placePic: Picture[] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    //NEXT
    const nextSlide = () => {
        setCurrentIndex( (prevIndex) => (prevIndex + 1) % placePic.length)
    };

    const prevSlide = () => {
        setCurrentIndex( (prevIndex) => (prevIndex - 1 + placePic.length) % placePic.length)
    };

    if (placePic.length === 0) {
        return <p>No pictures available</p>;
    };

  return (
    <div className="bg-white mx-auto max-w-full mb-5 mt-4 rounded-lg shadow-xl">

            <div className="relative w-full h-[400px] overflow-hidden  max-sm:h-[200px]">

                <Image
                src={placePic[currentIndex].picLink}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                />

                {/* LEFT ARROW BUTTON */}
                <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-950 text-white p-2 rounded-full transition-all hover:bg-blue-800 hover:shadow-md
                bg-opacity-70"
                >
                <FaArrowLeft/>
                </button>

                {/* RIGHT ARROW BUTTON */}
                <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-950 text-white p-2 rounded-full transition-all hover:bg-blue-800 hover:shadow-md
                bg-opacity-70"
                >
                <FaArrowRight/>
                </button>

            </div>
        </div>
  )
}

export default Carousel