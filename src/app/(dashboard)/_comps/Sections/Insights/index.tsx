import { Card, CardHeader, CardBody } from "../../Card";
import { IInsightsProps } from "./type";

export default function InsightsSection(props: IInsightsProps) {
  return (
    <Card>
      <CardHeader borderVariant="bottom-primary">
        <h2 className="font-bold">Insights</h2>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {props.data.map((item) => {
            return (
              <Card key={item.title} theme="frosted" className="shrink-0 grow">
                <CardHeader>
                  <h3 className="text-black font-medium">{item.title}</h3>
                </CardHeader>
                <CardBody className="pt-0 text-primary">
                  <p className="text-3xl font-bold">{item.value}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
