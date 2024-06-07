import { useState } from "react";
import { forms } from "./configs";
import { useTranslation } from "react-i18next";
import Link from "next/link";


const PublishedCampaignSettings =({campaignDetails}: {campaignDetails: ICampaignDetails})=>{
  const {t} = useTranslation("campaignsPage");
  const [activeForm, setActiveForm] = useState(forms[0]);

  const RenderedForm = activeForm.Comp;
  return (
    <div className={`px-5 grid md:grid-cols-4 md:gap-8`}>
      
      <div className="self-start grid gap-7">
        <ul className={`list-none flex gap-1 md:block md:*:mt-1`}>
          {forms.map(formData=> {
            return (
            <li
              key={formData.id}
              onClick={()=> setActiveForm(formData)}
              className={`
                border-[0.5px] border-borderOpticy p-2.5 capitalize flex justify-between flex-wrap transition-all font-minion relative text-[16px] cursor-pointer
                ${activeForm.id === formData.id? `bg-[#5A6A93] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-2.5 before:bg-orange`: ''}
              `}
            >
              {formData.title}
            </li>
          )})}
        </ul>
        <div className="p-4">
          <h4>{t("publishedCampaign.wantToChange")}</h4>
          <p className="font-light text-[12px] my-2 tracking-tight">
            {t("publishedCampaign.changeInstruction")}
            <Link href="" className="text-orange">
             {t("publishedCampaign.helpCenter")}
            </Link>
          </p>
        </div>
      </div>

      <div className={`md:col-start-2 md:col-end-5`}>
        <RenderedForm
          formId={activeForm.id}
          campaignDetails={campaignDetails}
        />
      </div>
    </div>
  );
}

export default PublishedCampaignSettings;