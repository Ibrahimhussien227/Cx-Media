"use client";

import React, { useRef, useState } from "react";

import { IDebouncedInputProps } from "./type";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { X } from "@/utils/icons";

const DebouncedInput = ({
  title,
  value: initialValue,
  placeholder = "Search",
  debounce = 500,
  searchParams,
}: // searchParams,
IDebouncedInputProps) => {
  const [search, setSearch] = useState(initialValue);
  const timerId = useRef<number>();
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const t = useTranslations("InvestorDashboardPage.explorePage");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      params.set("search", e.target.value);
      router.replace(`${pathname}?${params.toString()}`);
    }, debounce);
  };

  const resetSearch = () => {
    setSearch("");
    params.delete("search", search as string);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="h-full lg:w-[60%] w-full flex flex-row justify-between items-center">
      <div className="flex w-full relative">
        {title && (
          <p className="font-bold text-[10px] bg-white border-[1px] px-3 rounded-[2px] flex place-items-center">
            {title}
          </p>
        )}
        <input
          className=" text-[#93A0C3] text-[12px] w-full px-3 border-[1px] bg-lightBackground rounded-[2px] py-2 focus:border-active"
          placeholder={placeholder}
          value={search}
          onChange={handleChange}
        />
        {search && (
          <div
            className="flex flex-row items-center justify-end gap-x-2 cursor-pointer hover:underline absolute top-1/4 right-2"
            onClick={() => resetSearch()}
          >
            <div className="bg-secondary rounded-full border w-3 h-3 flex items-center justify-center ">
              <X weight="bold" size={8} className="text-white " />
            </div>

            <p className="text-[12px] tracking-[0]">{t("clearSearch")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebouncedInput;
