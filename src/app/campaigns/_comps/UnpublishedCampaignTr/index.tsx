"use client";

import StatusTag from '@/components/statusTag';
import {CaretRight, ImageSquare} from '@/utils/icons'
import { reviewStatusColorMap } from '../../config';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/formatDate';


export const UnpublishedCampaignTr =({data}:{data: ICampaignDetails})=>{
  const router = useRouter();
  const listingThumbnailPic = data.assetDetails?.assetMediaFiles?.find(fileData=> fileData.isThumbnail);

  return (
    <tr
      className="cursor-pointer relative after:block after:w-4 after:absolute after:top-0 after:left-20 after:bg-orange group hover:bg-[#5A6A93] hover:after:h-[1px] transition-all"
      onClick={()=> router.push("/campaigns/detail?id=" + data.campaignId)}
    >
      <td className='flex items-center align-baseline'>
        {
          listingThumbnailPic?
          <img
            src={listingThumbnailPic.filePath as string}
            alt="listing thumbnail"
            className='mr-2 shrink-0 inline-block'
            width={73}
            height={73}
          />
          :
          <span className='shrink-0 inline-grid w-[73px] h-[73px] place-items-center bg-[#232F4B] border border-[#5A6A93]'>
            <ImageSquare size={24} color="#93A0C3"/>
          </span>
        }
        <span className='p-4 font-minion text-[16px]'>
          {data.assetDetails?.assetName}
        </span>
      </td>
      <td className='text-center p-4'>
        <StatusTag
          text={data.reviewStatus}
          color={reviewStatusColorMap[data.reviewStatus as keyof typeof reviewStatusColorMap]}
        />
      </td>
      <td className='text-end p-4 font-minion text-[16px]'>
        {data.updatedAt?
          formatDate(data.updatedAt, ', ', ['t', 'd', 'm', 'y'])
          :
          ''
        }
        <span className='bg-orange p-2 rounded-[50%] cursor-pointer absolute -right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all'>
          <CaretRight color="white"/>
        </span>
      </td>
    </tr>
  );
}


export default UnpublishedCampaignTr;

