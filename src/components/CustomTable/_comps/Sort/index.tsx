import { FunnelSimple } from "@/utils/icons";
import Link from "next/link";
import React, { useState } from "react";
import { ISortProps } from "./type";
import { useSearchParams } from "next/navigation";

const Sort = ({ filterKey }: ISortProps) => {
  const [sortOrder, setSortOrder] = useState("ASC");
  const searchParams = useSearchParams();

  const params: { [key: string]: string } = {};

  for (const [key, value] of Array.from(searchParams.entries())) {
    params[key] = value;
  }

  return (
    <Link
      href={{
        query: {
          ...params,
          sortBy: filterKey,
          sortOrder: sortOrder,
        },
      }}
      onClick={() => {
        setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
      }}
      className="h-full p-1 border rounded-sm justify-center items-center flex cursor-pointer"
    >
      <FunnelSimple weight="bold" size={17} />
    </Link>
  );
};

export default Sort;
