import React from "react";

import { ITagsProps } from "./type";

const Tags = ({ title }: ITagsProps) => {
  return (
    <p className="text-secondary bg-[#EDF7FF] border text-[10px] font-bold items-center flex px-2 py-1 rounded-full">
      {title}
    </p>
  );
};

export default Tags;
