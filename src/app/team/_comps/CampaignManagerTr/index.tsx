"use client";
import React, { useState, useEffect } from "react";
import { formatDate } from '@/utils/formatDate';
import {ImageSquare} from '@/utils/icons'
import StatusTag from '@/components/statusTag';
import { CampaignManagerStatus } from '@/types/enum.constants';
import { useCampaignManagerStatusMutation } from '@/store/services/seller/teamApi';

import GeneralModal from "@/components/generalModal/index";
import Button from "@/components/button";
import ActionsMenu from '@/components/ActionsMenu';
export const CampaignManagerTr =({data}:{data: ICampaignManager})=>{

  const managerPfp = data.pfpPath
  const [setManagerStatus, {isSuccess}] = useCampaignManagerStatusMutation();
  
  const [isModalOpen, setModalOpen] = useState(false);  
  const [isModalSuccessOpen, setModalSuccessOpen] = useState(false); 

  
  const closeModal = () => {
    setModalOpen(false);
    setModalSuccessOpen(false)
  };

  const actions = [
    {
      title:
        data.status === CampaignManagerStatus.ACTIVE
          ? 'Block'
          : 'Activate',
          
      clickHandler: () => setModalOpen(true)
    }
  ];
  const handleClick = () => {   
    const newStatus =
      data.status === CampaignManagerStatus.ACTIVE
        ? CampaignManagerStatus.BLOCKED
        : data.status === CampaignManagerStatus.BLOCKED
        ? CampaignManagerStatus.ACTIVE
        : CampaignManagerStatus.INVITED;
  
    // Check if campaignManagerId is defined
    if (data.campaignManagerId !== undefined) {
      const companyStatusData = {
        campaignManagerId: data.campaignManagerId,
        status: newStatus,
      };
      setManagerStatus(companyStatusData);
    } else {
    
      console.error("campaignManagerId is undefined");
    }
  };
 
  useEffect(() => {
    if (isSuccess) {      
      setModalOpen(false)
      setModalSuccessOpen(true)
    }
  }, [isSuccess]);
  return (
    <>
      <tr className="cursor-pointer relative after:block after:w-4 after:absolute after:top-0 after:left-20 after:bg-orange group  transition-all">
        <td className="flex items-center align-baseline">
         
          {typeof managerPfp === "string" ? (
            <img
              src={managerPfp}
              alt="listing thumbnail"
              className="mr-2 shrink-0 inline-block"
              width={73}
              height={73}
            />
          ) : (
            <span className="shrink-0 inline-grid w-[73px] h-[73px] place-items-center bg-[#232F4B] border border-[#5A6A93]">
              <ImageSquare size={24} color="#93A0C3" />
            </span>
          )}
        </td>
        <td className="text-center text-[12px]">
          {data.status === CampaignManagerStatus.INVITED ? (
            <StatusTag text={data.status} color="yellow" />
          ) : data.status === CampaignManagerStatus.BLOCKED ? (
            <StatusTag text={data.status} color="red" />
          ) : (
            <StatusTag text={data.status} color="green" />
          )}
        </td>
        <td className="text-center">
          <span className="p-4 font-minion text-[16px]">{data.emailId}</span>
        </td>
        <td className="text-center">
          <span className="p-4 font-minion text-[16px]">
            {data.phoneNumber || "..."}
          </span>
        </td>
        <td className="text-center">
          <span className="p-4 font-minion text-[16px]">
            {data.campaignManagerId}
          </span>
        </td>

        <td className="text-end relative">
          <span className="p-4 pr-0 font-minion text-[16px] flex">
            {data.lastUpdateTimestamp
              ? formatDate(data.lastUpdateTimestamp, ", ", ["d", "m", "y"])
              : ""}
            <ActionsMenu actions={actions} />
          </span>
        </td>
      </tr>
      <GeneralModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex justify-center items-center flex-col p-[0]">
          <h2
            className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
          >
            {data.status === "ACTIVE" ? (
              <>Block User?</>
            ) : data.status === "BLOCKED" ? (
              <>Unblock User?</>
            ) : (
              <>Invited</>
            )}
          </h2>
          <p className="text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center">
            Are you sure you want to{" "}
            {data.status === "ACTIVE" ? (
              <>Block User?</>
            ) : data.status === "BLOCKED" ? (
              <>Unblock User?</>
            ) : (
              <>Invited</>
            )}{" "}
            {data.emailId}? Access to the seller portal will be restored to this
            user.
          </p>
        </div>
        <div className="flex  px-[0] pt-[20px] pb-[10px]">
          <Button
            color="#5A6A93"
            onClick={closeModal}
            className="py-3 px-8 mr-3"
          >
            Cancel
          </Button>
          <Button
            color="#FF6C02"
            className="grow tracking-[1.5px] uppercase"
            onClick={handleClick}
          >
            YES, PROCEED
          </Button>
        </div>
      </GeneralModal>
      <GeneralModal isOpen={isModalSuccessOpen} onClose={closeModal}>
        <div className="flex justify-center items-center flex-col p-[0]">
          <h2
            className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
          >
            {data.status === CampaignManagerStatus.ACTIVE ? (
              <>User Unblocked</>
            ) : data.status === CampaignManagerStatus.BLOCKED ? (
              <>User Blocked</>
            ) : (
              <>Invited</>
            )}
          </h2>
          <p className="text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center">
            You have successfully{" "}
            {data.status === CampaignManagerStatus.ACTIVE ? (
              <>User Unblocked</>
            ) : data.status === CampaignManagerStatus.BLOCKED ? (
              <>User Blocked</>
            ) : (
              <>Invited</>
            )}{" "}
            {data.emailId}? The user can now access the seller portal.
          </p>
        </div>
        <div className="flex  px-[0] pt-[20px] pb-[10px]">
          <Button
            color="#FF6C02"
            className="grow tracking-[1.5px] uppercase"
            onClick={closeModal}
          >
            OK
          </Button>
        </div>
      </GeneralModal>
    </>
  );
}


export default CampaignManagerTr;