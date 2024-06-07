import { useMemo } from "react";
import { Card, CardBody, CardHeader } from "../../Card";
import {
  numberCommaSeparatedFormatter,
  numberCompactShortFormatter,
} from "@/app/(dashboard)/utils";
import { ILineChart } from "./type";
import HorizontalBars from "../../HorizontalBars";

const LineChart = (props: ILineChart) => {
  const total = useMemo(
    () => props.data.reduce((acc, { value }) => acc + value, 0),
    [props.data],
  );

  return (
    <Card>
      <CardHeader borderVariant="bottom-primary">
        <h2 className="font-bold">{props.header}</h2>
        <p className="font-bold">
          {numberCommaSeparatedFormatter.format(total)}
        </p>
      </CardHeader>
      <CardBody>
        <HorizontalBars
          data={props.data}
          xAxisLabel={(value) => numberCompactShortFormatter.format(value)}
          xAxisStep={props.xAxisStep}
          xAxisMax={props.xAxisMax}
        />
      </CardBody>
    </Card>
  );
};

export default LineChart;
