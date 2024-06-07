import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { SideNavItemProps } from "./type";
import * as icons from '@/utils/icons'

const SidebarNavItem = ({
  title,
  to,
  navSize,
  Icon,
}: SideNavItemProps) => {
  const pathName = usePathname();
  const { locale } = useParams();


  const isActive =
    pathName === to ||
    pathName === `/${locale}${to}` ||
    (pathName.includes("/portfolio/") && to.includes("/portfolio"));
 
  const IconComp = icons[Icon as keyof typeof icons];

  return (
    <div
      className={`hover:bg-[#5A6A93]"   relative   ${
        isActive && " border-b-[1px] border-t-[1px]  bg-[#5A6A93] active"
      }  `}
    >    
      <Link href={to}>
        <div
         className={`flex items-center py-4 mx-4 rounded-lg cursor-pointer gap-3 ${isActive? "text-[#ffffff]" : "text-[#BFC5D5]"} `}
        >
          {IconComp && <IconComp size={26} color={isActive? 'white': '#BFC5D5'} className="shrink-0"/>}
          <span className={`font-bold text-[10px] text-inherit tracking-[1.5px] ${navSize == "small" ? "hidden" : "flex flex-col"}`}>
            {title}
          </span>
          {isActive && (
            <span className="top-[20px] absolute right-[-1px] h-4 w-[2px] bg-active" />
          )}
        </div>
      </Link>
    
    </div>
  );
};

export default SidebarNavItem;
