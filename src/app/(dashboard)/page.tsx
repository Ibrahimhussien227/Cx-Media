"use client";

import { useUserToken } from "@/hooks/useUserToken";
import {
  campaignsDefaultData,
  insightsDefaultData,
  investorsDefaultData,
  lineChartDefaultData,
  sellerDefaultData,
  statsDefaultData,
  usersNationalityDefaultData,
} from "./config";
import DashboardAnalyticsSection from "./_comps/Sections/DashboardAnalytics";

import InsightsSection from "./_comps/Sections/Insights";
import CampaignsSection from "./_comps/Sections/Campaigns";
import { useGetAdmins } from "@/hooks/services/admin/useGetAdmins";
import PageSkeleton from "./_comps/PageSkeleton";
import LineChart from "./_comps/Sections/LineChart";
import UsersNationalitySection from "./_comps/Sections/UsersNationality";
import UsersRegistrationsSection from "./_comps/Sections/UsersRegistrations";

export default function Dashboard() {
  useUserToken();

  const { isLoading } = useGetAdmins();
  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <section className="p-5 w-full flex flex-col gap-4 max-h-full overflow-y-auto no-scrollbar">
      <DashboardAnalyticsSection data={statsDefaultData} />

      <div className="flex gap-4 flex-col lg:flex-row">
        <UsersRegistrationsSection data={lineChartDefaultData} />

        <div className="lg:w-1/2 flex flex-col gap-4">
          <LineChart
            header="Seller"
            data={sellerDefaultData}
            xAxisStep={2_000}
            xAxisMax={10_000}
          />

          <LineChart
            header="Investors"
            data={investorsDefaultData}
            xAxisStep={2_000}
            xAxisMax={10_000}
          />
        </div>
      </div>

      <InsightsSection data={insightsDefaultData} />

      <div className="flex gap-4 flex-col lg:flex-row">
        <CampaignsSection data={campaignsDefaultData} className="lg:w-1/2" />

        <UsersNationalitySection data={usersNationalityDefaultData} />
      </div>
    </section>
  );
}
