import CustomButton from "@/components/CustomButton";
import * as icons from "@/utils/icons";
import ActionsMenu from "@/components/ActionsMenu";
import { Card, CardBody, CardHeader } from "../../Card";
import { numberCommaSeparatedFormatter } from "../../../utils";
import { IDashboardAnalyticsSectionProps } from "./type";

const DashboardAnalyticsSection = (props: IDashboardAnalyticsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold">Dashboard Analytics</h2>

        <div className="flex flex-wrap">
          <CustomButton className="bg-primary flex flex-row items-center justify-center gap-2 text-white py-1 px-4 rounded-sm">
            <p className="font-bold text-sm">Period</p>
          </CustomButton>

          {/* this should be custom select it's filter not action */}
          <ActionsMenu
            actions={[
              { title: "This Week", status: "This Week" },
              { title: "This Month", status: "This Month" },
            ]}
            handler={() => {
              // setValue("action", action, { shouldDirty: true });
              // setShowModal(true);
            }}
          />
        </div>
      </CardHeader>
      <CardBody className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        {props.data?.map((item) => {
          const Icons = icons[item.icon as keyof typeof icons];

          return (
            <Card key={item.title} theme="frosted" className="grow shrink-0">
              <div className="flex items-center px-4 gap-4">
                <div className="size-14 flex-shrink-0 bg-primary rounded-full flex items-center justify-center">
                  <Icons alt={item.title} size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <CardHeader className="px-0">
                    <h3 className="text-black font-medium">{item.title}</h3>
                  </CardHeader>
                  <CardBody className="pt-0 text-primary px-0">
                    <p className="text-xl font-bold">
                      {numberCommaSeparatedFormatter.format(item.value)}
                    </p>
                  </CardBody>
                </div>
              </div>
            </Card>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default DashboardAnalyticsSection;
