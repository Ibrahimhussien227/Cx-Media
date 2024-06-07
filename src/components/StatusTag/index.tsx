import React from "react";

import { STATUS } from "@/types/enum.constants";
import { CONTENT } from "./configs";

const StatusTag = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  const indexer = (text as STATUS) ?? "";

  return CONTENT[indexer] ? (
    <span
      className={`${CONTENT[indexer]?.color} font-semibold bg-white inline-block border rounded-full text-xs tracking-wide uppercase text-center px-3 py-0.5 ${className}`}
    >
      {CONTENT[indexer]?.name}
    </span>
  ) : (
    "-"
  );
};

export default StatusTag;
