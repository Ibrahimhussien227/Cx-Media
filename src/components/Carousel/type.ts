import { StaticImageData } from "next/image";

export interface ImageCarousel {
  slides: { filePath: string | StaticImageData }[];
  autoSlide?: boolean;
}
