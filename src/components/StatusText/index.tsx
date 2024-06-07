import React from "react";

import { STATUS } from "@/types/enum.constants";
import { CONTENT } from "./configs";

const StatusText = ({ text }: { text?: string }) => {
  const indexer = (text as STATUS) ?? "";

  return (
    <p
      className={`${CONTENT[indexer]?.color} font-semibold bg-white inline-block border rounded-full text-xs tracking-wide uppercase text-center px-2 py-0.5`}
    >
      {CONTENT[indexer]?.name}
    </p>
  );
};

export default StatusText;
