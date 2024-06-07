// import { useRef } from "react";

import { DownloadSimple } from "@/utils/icons";
import { IFileDownloader } from "./type";
import Link from "next/link";

const FileDownloader = ({ label, filePath, disabled }: IFileDownloader) => {
  // const anchorRef = useRef<HTMLAnchorElement>(null);

  // const handleDownload = async () => {
  //   fetch(filePath, {
  //     method: "GET",
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // Create blob link to download
  //       const url = window.URL.createObjectURL(new Blob([blob]));
  //       const link = anchorRef.current;
  //       if (link) {
  //         link.href = url;
  //         link.setAttribute(
  //           "download",
  //           `titleDeedFile-2L9iu71aJc4JGJ230mTQ.pdf`
  //         );

  //         // Start download
  //         link.click();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading file:", error);
  //     });
  // };

  return !disabled && filePath ? (
    <Link
      href={filePath ?? ""}
      // target="_blank"
      // rel="noopener noreferrer"
      passHref={true}
    >
      <button
        className="flex flex-row justify-center items-center gap-2"
        // onClick={handleDownload}
      >
        <DownloadSimple size={14} />
        {label && <span className="text-[12px] font-medium">Download</span>}
      </button>
    </Link>
  ) : (
    <DownloadSimple size={14} />
  );
};

export default FileDownloader;
