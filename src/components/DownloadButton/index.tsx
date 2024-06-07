"use client";

import { useRef } from "react";
import Button from "../button";

import {DownloadSimple} from '@/utils/icons';

const DownloadButton =({srcUrl, className}:{srcUrl: string, className?: string})=>{
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const downloadAsset =()=> {
      fetch(srcUrl)
      .then(resp=> resp.blob())
      .then(assetBlob=> {
        
        const tempUrl = window.URL.createObjectURL(new Blob([assetBlob]));
        if (anchorRef.current){
          anchorRef.current.href = tempUrl;
          anchorRef.current.setAttribute("download", `FileName.${assetBlob.type.includes("/")? assetBlob.type.split("/")[1]: assetBlob.type}`);
          console.log(tempUrl);
          // Start download
          anchorRef.current.click();
        }
      })
  }

  return (
    <>
      <a className="hidden" ref={anchorRef}/>
      <Button color="#5A6A93" onClick={downloadAsset} className={className}>
        <DownloadSimple size={18} className="shrink-0"/>
      </Button>
    </>
  );
}


export default DownloadButton;

