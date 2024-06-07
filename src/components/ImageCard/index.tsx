import GeneralCheckbox from "../GeneralCheckbox";
import ImageInput from "../ImageInput";
import { IImageCardProps } from "./type";

const ImageCard = ({
  onChange,
  onDelete,
  onthumbnail,
  imgUrl,
  imagesArray,
  thumbnail,
  disabled,
}: IImageCardProps) => {
  return (
    <div className="border bg-white w-[calc(50%_-_7.5px)]">
      <ImageInput
        imagesArray={imagesArray}
        value={{
          alt: "test input",
          url: imgUrl,
        }}
        className="h-44"
        onChange={onChange}
        onDelete={onDelete}
        disabled={disabled}
        placeholder={{
          label: "Choose an image",
          media: {
            type: "icon",
            src: "Storefront",
            props: {
              size: 80,
            },
          },
        }}
      />
      <div className="flex flex-row px-2 pb-1 gap-5">
        {!disabled && (
          <>
            <GeneralCheckbox
              onChange={onthumbnail}
              checked={thumbnail}
              label="Set as thumbnail"
              disabled={!imgUrl}
            />
            <GeneralCheckbox label="For Compliance" disabled={!imgUrl} />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
