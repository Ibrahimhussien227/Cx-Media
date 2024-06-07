import React, { useEffect, useRef, useState } from "react";
import { DebouncedInputProps } from "./type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DebouncedInput = ({
  value: initialValue,
  placeholder = "Search",
  debounce = 500,
  searchKey,
}: DebouncedInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState<string | number>();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const timerId = useRef<number>();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  // const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(ev.target.value);

  //   clearTimeout(timerId.current);

  //   timerId.current = window.setTimeout(() => {
  //     console.log("calling on change");
  //     // onChange(ev.target.value);
  //   }, debounce);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      if (e.target.value === "") {
        params.delete(searchKey || "");
      } else {
        params.set(searchKey || "", e.target.value);
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, debounce);
  };

  return (
    <input
      className="h-7 max-w-40 rounded-sm bg-white text-[12px] font-normal border px-2"
      placeholder={placeholder}
      defaultValue={value}
      onChange={handleChange}
    />
  );
};

export default DebouncedInput;
