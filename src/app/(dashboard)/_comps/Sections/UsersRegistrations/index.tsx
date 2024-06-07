import { numberCompactShortFormatter } from "@/app/(dashboard)/utils";
import { Card, CardBody, CardHeader } from "../../Card";
import { LineChart } from "../../Chart/Line";
import { IUsersRegistrationsSectionProps } from "./type";

const UsersRegistrationsSection = (props: IUsersRegistrationsSectionProps) => {
  return (
    <Card className="lg:w-1/2">
      <CardHeader borderVariant="bottom-primary">
        <h2 className="font-bold">Users Registrations</h2>
        <p className="font-bold">1,50,905</p>
      </CardHeader>
      <CardBody className="flex-grow flex items-center justify-center max-h-[28rem]">
        <LineChart
          data={props.data}
          options={{
            responsive: true,
            scales: {
              x: {
                grid: {
                  color: "#EEF4FA",
                },
              },
              y: {
                grid: {
                  color: "transparent",
                },
                ticks: {
                  callback(tickValue) {
                    return numberCompactShortFormatter.format(
                      Number(tickValue),
                    );
                  },
                },
              },
            },
          }}
        />
      </CardBody>
    </Card>
  );
};

export default UsersRegistrationsSection;
