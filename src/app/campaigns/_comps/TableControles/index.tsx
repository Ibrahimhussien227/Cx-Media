"use client";

import CustomSelect from "@/components/customSelect";
import { converetSortconfigsToOptions } from "./utils";
import { useEffect, useState } from "react";
import { sortConfigs } from "./config";
import { ITableControlesProps } from "./types";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SwitchFilterItem } from "@/components/switchFilter/types";
import SwitchFilter from "@/components/switchFilter";
import { DebouncedInput } from "@/components/TextInputs";
import { campaignStates, campaignStatus } from "@/types/enum.constants";
import { createQueryString } from "../../utils";


const TableControles =({handleTableParamsChange}:ITableControlesProps)=> {

  const { t } = useTranslation("campaignsPage");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [sortingField, setSortingField] = useState<IOption | undefined>();

  const handleSort =(sortOp:IOption)=>{
    if (sortOp.value == sortingField?.value){
      return;
    }
    setSortingField(sortOp);
    const [sortKey, sortDirection] = sortOp.value.split('_');
    handleTableParamsChange({
      sortBy: sortKey,
      sortOrder: sortDirection as "ASC" | "DESC"
    })
  }
  const navigationItems: SwitchFilterItem[] = [
    { name: t("listing.unpublished"), param: 'status', value: campaignStates.UNPUBLISHED },
    { name: t("listing.published"), param: 'status', value: campaignStatus.AVAILABLE },
    { name: t("listing.funded"), param: 'status', value: campaignStatus.FUNDED },
  ];
  // TODO: discuss this with bablu.. unpublished gets only campaigns in review, no draft returned
  useEffect(()=>{
    const campaignState = searchParams.get("status");
    if (!campaignState){
      router.replace(pathname + '?' + createQueryString(searchParams, 'status', navigationItems[0].value))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
  
  useEffect(()=> {
      const campaignState = searchParams.get("status");
      if (campaignState){
        handleTableParamsChange({
          campaignStatus: campaignState
        })
      }
  }, [searchParams, handleTableParamsChange])

  return (
    <div className='flex gap-5 items-center justify-between overflow-y-auto'>
      <div className="flex flex-row  items-center">
        <div className=" flex items-center">
          <label className='border border-[#5A6A93] shrink-0 text-[10px] bold tracking-widest text-faint inline-block p-2'>
          {t("search")}
          </label>
          <DebouncedInput
            onChange={(searchValue=> handleTableParamsChange({searchValue}))}
            placeholder={t("searchPlaceholder")}
            className="text-[#93A0C3] w-full text-[12px]"
          />
        </div>          
      </div>
      <div className="">
            <SwitchFilter items={navigationItems} searchParams={searchParams} />
          </div>
      <div className='flex items-center'>
        <label className='border border-[#5A6A93] shrink-0 text-[10px] bold tracking-widest text-faint inline-block p-2'>
        {t("sortBy")}
        </label>
        <CustomSelect
          options={converetSortconfigsToOptions(sortConfigs)}
          value={sortingField}
          onSelect={handleSort}
          className='grid-cols-[1fr] d-block'
        />
      </div>
    </div>
  );
}

export default TableControles;