"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import NotifCard from "@/components/NotifCard";
import { useGetNotificationsQuery } from "@/store/services/notification/api";

const NotificationsPage = () => {
  const { t } = useTranslation("notificaionsPage");
  const { data, isLoading } = useGetNotificationsQuery();


  return (
    <>
      <header className="sm:px-10 px-5 py-5 flex items-center border-b-[1px]">
        <h1 className="text-[20px]">{t("title")}</h1>
      </header>
      <div className="sm:px-10 px-5 py-5 grid gap-2">
        {isLoading ? (
          <div>Loading...</div>
        ) : data?.data.length ? (
          data.data.map((notif: any, idx: any) => (
            <NotifCard
              key={idx}
              header={notif.notificationHeader}
              description={notif.notificationBody}
              date={notif.createdAt}
              isRead={notif.isRead}
            />
          ))
        ) : (
          <p className="font-thin tracking-tight">No Notifications</p>
        )}
      </div>
    </>
  );
};

export default NotificationsPage;
