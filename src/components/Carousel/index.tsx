"use client";

import React, { useState } from "react";
import Image from "next/image";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import { CaretLeft, CaretRight, CornersOut } from "@/utils/icons";
import CustomButton from "@/components/CustomButton";
import { ImageCarousel } from "./type";

type CarouselApi = UseEmblaCarouselType[1];

const Carousel = ({ slides, isDetail = false }: ImageCarousel) => {
  const [carouselRef, api] = useEmblaCarousel({
    loop: true,
    axis: "x",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

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

  React.useEffect(() => {
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
          {slides?.length ? (
            slides.map((image, index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 pt-0 h-full"
              >
                <div className="relative h-full w-full">
                  {/* {image.filePath} */}
                  <Image
                    unoptimized
                    src={
                      image?.filePath.length
                        ? image.filePath
                        : "/images/not-found.png"
                    }
                    alt={image?.filePath ?? "Property Images"}
                    width={292.8}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 pt-0 h-full">
              <div className="relative h-full w-full">
                {/* {image.filePath} */}
                <Image
                  unoptimized
                  src="/images/not-found.png"
                  alt="Property Images"
                  width={292.8}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isDetail && (
        <div className="absolute text-white text-[11px] bottom-4 right-4 flex flex-row items-center justify-center gap-2">
          <div className="rounded-sm flex border border-[#ffffff] items-center justify-center px-2 font-bold bg-[#2C3A5C] bg-opacity-[0.5]">
            <p>1 OF {slides?.length} IMAGES</p>
          </div>
          <div
            onClick={() => setShowFullScreen(true)}
            className="rounded-sm border border-[#ffffff] bg-[#2C3A5C] bg-opacity-[0.5] cursor-pointer"
          >
            <CornersOut size={18} />
          </div>
        </div>
      )}
      {showFullScreen && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
            onClick={() => setShowFullScreen(false)}
          />
          <div className="transform transition-all w-[1000px]">
            <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 pt-0 h-full">
              <div className="relative h-full w-full">
                <Image
                  unoptimized
                  src={
                    slides[selectedIndex].filePath || "/images/not-found.png"
                  }
                  alt={slides[selectedIndex].filePath || "Property Images"}
                  width={292.8}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {slides?.length ? (
        <>
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
            className="absolute z-40 text-white top-1/2 right-4 rounded-full flex w-6 h-6 border items-center justify-center bg-[#2C3A5C] bg-opacity-[0.5] hover:bg-active cursor-pointer"
          >
            <CaretRight size={16} />
          </CustomButton>
          <div className="flex flex-row absolute top-1 gap-2 mt-4 left-[50%]">
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
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Carousel;
