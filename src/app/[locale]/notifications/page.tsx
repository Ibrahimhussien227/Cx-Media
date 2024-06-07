import React from "react";

import NotifyCard from "./_component/NotifyCard";
// import { getNotifications } from "@/utils/api/getNotificationsApi";

const Notifications = async () => {
  // const notifications = await getNotifications();

  return (
    <div className="w-full border-r gradient">
      <h2 className="w-full flex h-[70px] sm:px-10 px-5 items-center border-b-[1px] text-[20px] font-MinionPro">
        Notifications
      </h2>
      <div className="flex flex-col w-full gap-2 px-10 pt-5">
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
