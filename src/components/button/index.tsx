"use client";

import React from "react";
import { IButtonProps } from "./types";
import { useRouter } from "next/navigation";



const Button = ({
  children,
  color,
  hoverColor,
  disabled,
  variant = "primary",
  onClick,
  className,
  type = 'button',
  to,
}: IButtonProps) => {
  const router = useRouter();

  const handleClick =(ev:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    if (to){
      router.push(to)
    }
    onClick && onClick(ev)
  }
  
  const variantStyles = {
    "primary": `bg-[${color}] ${hoverColor? `hover:bg-[${hoverColor}] hover:border-[${hoverColor}]`:''}`,
    "secondary": `bg-transparent text-[${color}] border border-[${color}] hover:bg-[${color}] hover:text-white hover:border-transparent`,
    "ghost": `bg-transparent text-[${color}] hover:bg-[${color}] hover:bg-opacity-20`
  }
  const variantStyle = variantStyles[variant as keyof (typeof variantStyles)] ;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={`
        shrink-0 uppercase font-bold text-[10px] leading-3 p-2.5 rounded-sm tracking-[1.5px]
        flex items-center gap-2.5 justify-center border-1 border-solid ${variantStyle} ${className}
        ${disabled? 'opacity-[70%]': ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
