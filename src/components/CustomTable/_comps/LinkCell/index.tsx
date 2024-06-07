import React from "react";

import { LinkCellProps } from "./type";
import TextLinkDownload from "@/components/TextLinkDownload";

const LinkCell = ({ cell }: LinkCellProps) => {
  return (
    <TextLinkDownload
      href={cell.row.original.receiptLink.href}
      title={cell.row.original.receiptLink.title}
    />
  );
};

export default LinkCell;
