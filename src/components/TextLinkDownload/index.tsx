import Link from "next/link";
import React from "react";

const TextLinkDownload = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      className="text-blue-500 font-medium text-[14px]"
      href={href}
      passHref={true}
    >
      {title}
    </Link>
  );
};

export default TextLinkDownload;
