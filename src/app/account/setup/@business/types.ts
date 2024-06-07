
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/query";
import { Dispatch, SetStateAction } from "react";


export interface ISetupSectionProps {
  activeTabState: {
    activeTabIdx: number;
    setActiveTabIdx:  Dispatch<SetStateAction<number>>//(idx:number)=> void;
  };
  user: ISellerProfile;
  configActionBtn?: (configParams:Partial<actionBtnConfig>)=> void
}


export type RTKSellerTrigger<params, returnType = void> = MutationTrigger<MutationDefinition<
  params,
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  "Profile",
  returnType,
  "sellerApi">
>
