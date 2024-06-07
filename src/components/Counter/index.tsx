"use client";

import React, { useEffect, useState } from "react";

import { Minus, Plus } from "@/utils/icons";
import { usePathname, useRouter } from "next/navigation";
// import { ICounterProps } from "./type";

const Counter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    router.replace(pathname + `?count=${count}`);
  }, [count, router, pathname]);

  return (
    <div className="flex items-center bg-white border rounded-sm">
      <button
        onClick={() => count > 1 && setCount((prevCount) => prevCount - 1)}
        className={`px-2 flex items-center justify-center border-r h-full ${
          count === 1 && "cursor-not-allowed"
        }`}
      >
        <div className="py-2 px-2 rounded-full border">
          <Minus size={14} />
        </div>
      </button>
      <p className="text-[20px] font-MinionPro px-3 flex items-center justify-center tracking-[0px]">
        {count}
      </p>
      <button
        onClick={() => setCount((prevCount) => prevCount + 1)}
        className="px-2 flex items-center justify-center border-l h-full"
      >
        <div className="py-2 px-2 rounded-full border">
          <Plus size={14} />
        </div>
      </button>
    </div>
  );
};

export default Counter;
