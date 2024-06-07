"use client";
import { useTranslation } from "react-i18next";
import { SupportNavItems } from "./config";
import NavCard from "@/components/NavCard";

const SupportPage =({children}: {children: React.ReactNode})=> {
  const {t} = useTranslation("supportPage");
  return (
    <>
      <header className="sm:px-10 px-5 py-5 flex items-center border-b-[1px]">
        <h1 className="text-[20px]">{t("title")}</h1>
      </header>
      <div className="flex md:flex-row flex-col gap-4 sm:px-10 px-5 py-5">
        <ul>
          {SupportNavItems.map(item=> (
            <li key={item.href}>
              <NavCard
                title={t(`nav.${item.title}`)}
                description={t(`nav.${item.description}`)}
                href={item.href}
              />
            </li>
          ))}
        </ul>
        <div className="flex w-full sm:pl-[20px] flex-col">
          {children}
        </div>
      </div>
    </>
  );
}


export default SupportPage;