import React from "react";
import Link from "next/link";

import { ArrowLeft } from "@/utils/icons";
import NotifyCard from "./_component/NotifyCard";

const Notifications = () => {
  return (
    <div className="w-full">
      <header className="bg-white flex flex-col items-start justify-between p-5">
        <Link href="." className="flex items-center gap-2 text-base font-bold">
          <ArrowLeft size={24} />
          Notifications
        </Link>
      </header>
      <div className="flex flex-col w-full gap-2 px-2 pt-5">
        <NotifyCard
          header="New Notification Header."
          description="Notification body text."
          date="Yesterday, 12:45 pm"
          isNew
        />
        <NotifyCard
          header="New Notification Header."
          description="Notification body text."
          date="Yesterday, 12:45 pm"
        />
      </div>
    </div>
  );
};

export default Notifications;
