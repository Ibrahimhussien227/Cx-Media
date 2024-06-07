"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import { CaretLeft, CaretRight } from "@/utils/icons";
import CustomButton from "@/components/CustomButton";
import { ImageCarousel } from "./type";

type CarouselApi = UseEmblaCarouselType[1];

const Carousel = ({ slides, autoSlide = true }: ImageCarousel) => {
  const [carouselRef, api] = useEmblaCarousel({
    loop: true,
    axis: "x",
    duration: 50,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (autoSlide) {
      // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
      const timeoutId = setTimeout(() => {
        scrollNext();
      }, 3000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }); // Empty dependency array ensures the effect runs only once

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div onKeyDownCapture={handleKeyDown} className="relative h-full">
      <div ref={carouselRef} className="h-full overflow-hidden">
        <div className="flex -ml-4 h-full ">
          {slides.map((image, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 pt-0 h-full"
            >
              <div className="relative h-full w-full">
                <Image
                  unoptimized
                  src={image?.filePath || "/images/not-found.png"}
                  alt={image?.filePath.toString() || "Property Images"}
                  width={292.8}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomButton
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className="absolute z-40 text-white top-1/2 left-4 rounded-full flex w-6 h-6 border items-center justify-center bg-[#2C3A5C] bg-opacity-[0.5] hover:bg-active cursor-pointer"
      >
        <CaretLeft size={16} />
      </CustomButton>
      <CustomButton
        disabled={!canScrollNext}
        onClick={scrollNext}
        className="absolute text-white top-1/2 right-4 z-40 rounded-full flex w-6 h-6 border items-center justify-center bg-[#2C3A5C] bg-opacity-[0.5] hover:bg-active cursor-pointer"
      >
        <CaretRight size={16} />
      </CustomButton>
      <div className="flex flex-row absolute bottom-5 gap-2 mt-4 left-[50%]">
        {api?.scrollSnapList().map((_, index) => (
          <button
            key={index}
            className={`h-[6px] w-[6px] rounded outline-none shadow-[0px 0px 5px #555] mb-[0.2rem] cursor-pointer ${
              selectedIndex === index
                ? "bg-white"
                : " bg-primary border border-white"
            }`}
            onClick={() => api.scrollTo(index)}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default Carousel;
