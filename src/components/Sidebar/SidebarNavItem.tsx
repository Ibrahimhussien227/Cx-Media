import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

import { useTranslation } from "react-i18next";

import { SideNavItemProps } from "./type";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CaretDown } from "@/utils/icons";
import { hideDropdown, showDropdown } from "@/utils/motions";

const SidebarNavItem = ({ title, to, Icon, items }: SideNavItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { t } = useTranslation("sidebar");
  const pathName = usePathname();
  const { locale } = useParams();

  const isActive = pathName === to || pathName.startsWith(`${to}/`);

  const hasActiveSubLink = items?.some(
    ({ to }) => (to && pathName.includes(to)) || pathName === `/${locale}${to}`,
  );

  useEffect(() => {
    // Set isExpanded to true if hasActiveSubLink is true
    if (hasActiveSubLink) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [hasActiveSubLink]);

  return (
    <div className="bg-[#ffffff] relative my-2">
      {to !== "." ? (
        <Link href={to}>
          <div
            className={`hover:bg-primary hover:font-medium hover:text-white py-4 ${
              isActive
                ? "bg-primary font-medium text-white"
                : "font-light text-black"
            }`}
          >
            <div className="flex flex-row items-center rounded-lg cursor-pointer gap-3 w-full mx-4">
              {typeof Icon === "string" ? (
                <Image
                  src={`/images/${Icon}`}
                  width={16}
                  height={16}
                  alt={to}
                />
              ) : (
                <Icon />
              )}

              <div className="flex flex-col">
                <p className="text-[13px]">{title}</p>
              </div>
              <div></div>
            </div>
          </div>
        </Link>
      ) : (
        <div>
          <div
            className={`hover:bg-primary hover:font-medium hover:text-white cursor-pointer py-4 ${
              isActive
                ? "bg-primary font-medium text-white"
                : "font-light text-black flex flex-row items-center justify-center"
            }`}
            onClick={() => setIsExpanded((prevState) => !prevState)}
          >
            <div className="flex flex-row items-center rounded-lg gap-3 w-full mx-4">
              <Icon />

              <p
                className={`flex flex-col text-[13px] ${
                  hasActiveSubLink ? "font-bold" : "font-light"
                }`}
              >
                {title}
              </p>
            </div>

            <CaretDown
              size={14}
              className={`shrink-none ${
                isExpanded ? "rotate-180 font-bold w-4" : "rotate-0"
              } transition-all flex justify-center items-center mr-5`}
            />
          </div>
          <motion.div
            className="w-full hidden overflow-y-scroll no-scrollbar space-y-3"
            animate={isExpanded ? showDropdown : hideDropdown}
          >
            {items?.map(({ title, to }) => {
              const isActiveSubLink =
                (to && pathName.includes(to)) || pathName === `/${locale}${to}`;

              return (
                <Link key={title} href={to}>
                  <p
                    className={`flex flex-row text-[13px] text-center items-center w-full px-10 py-3 cursor-pointer gap-3 hover:bg-[#2C3A5C1F] hover:font-medium ${
                      isActiveSubLink
                        ? "bg-primary font-medium text-white"
                        : "font-light text-black"
                    }`}
                  >
                    {t(title)}
                  </p>
                </Link>
              );
            })}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SidebarNavItem;
