"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavCard = ({
  title,
  description,
  children,
  href,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  href: string;
}) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? "border-[1px] bg-white border-[#D4E4F2]"
          : "bg-gradient-white-transparent border-[#fffaf800]"
      }  p-[20px] mb-[10px] rounded-[2px] relative`}
    >
      {/* Flat Div */}
      <div
        className={`bg-active text-[white] h-[12px] w-[2px] top-[26px] left-[-1px] absolute ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <h3 className="text-secondary text-[16px] font-MinionPro">{title}</h3>
      <p className="text-secondary text-[12px] tracking-[0]">{description}</p>
      {children && (
        <div className="flex w-full items-center mt-2">{children}</div>
      )}
    </Link>
  );
};

export default NavCard;
