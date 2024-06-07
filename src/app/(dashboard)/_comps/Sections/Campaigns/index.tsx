import CustomButton from "@/components/CustomButton";
import { Card, CardHeader, CardBody } from "../../Card";
import { DoughnutChart, type DoughnutChartProps } from "../../Chart/Doughnut";
import { useMemo } from "react";
import { numberCommaSeparatedFormatter } from "../../../utils";
import { ICampaignsSectionProps } from "./type";

const CampaignsSection = (props: ICampaignsSectionProps) => {
  const total = useMemo(
    () => props.data.reduce((acc, { value }) => acc + value, 0),
    [props.data],
  );

  const chartProps = useMemo(() => {
    const chartProps = {
      id: "doughnutChart",
      plugins: [
        {
          id: "doughnutChart",
          beforeDraw: (chart) => {
            {
              const width = chart.width;
              const height = chart.height;
              const ctx = chart.ctx;
              ctx.restore();
              const fontSize = (height / 325).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "top";
              ctx.fillStyle = "#333333";
              const text = "Total Campaigns";
              const textX = Math.round(
                (width - ctx.measureText(text).width) / 2,
              );
              const textY = height / 2.3;
              ctx.fillText(text, textX, textY);
              ctx.save();
            }

            {
              const width = chart.width;
              const height = chart.height;
              const ctx = chart.ctx;
              ctx.restore();
              const fontSize = (height / 220).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "top";
              const text = numberCommaSeparatedFormatter.format(total);
              const textX = Math.round(
                (width - ctx.measureText(text).width) / 2,
              );
              const textY = height / 2;
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          },
        },
      ] as DoughnutChartProps["plugins"],
      data: {
        labels: [] as string[],
        datasets: [
          {
            label: "Total Campaigns",
            data: [] as number[],
            backgroundColor: [] as string[],
          },
        ],
      },
    } satisfies DoughnutChartProps;

    for (const item of props.data) {
      chartProps.data.labels.push(item.title);
      chartProps.data.datasets[0].data.push(item.value);
      chartProps.data.datasets[0].backgroundColor.push(item.bgColor);
    }

    return chartProps;
  }, [total, props.data]);

  return (
    <Card className={props.className}>
      <CardHeader borderVariant="bottom-primary">
        <h2 className="font-bold">Campaigns</h2>

        <div className="flex flex-wrap gap-2 items-center p-1 border border-secondary/10">
          <CustomButton className="bg-primary flex flex-row items-center justify-center gap-2 text-white py-1 px-4 rounded-sm font-semibold text-sm">
            All
          </CustomButton>
          <span className="text-sm font-normal ps-3.5 pe-2.5">
            Applications
          </span>
        </div>
      </CardHeader>
      <CardBody className="flex gap-x-8 gap-y-4">
        <div className="w-1/4 flex items-center justify-center">
          <DoughnutChart {...chartProps} />
        </div>
        <ul className="flex flex-col gap-2 flex-grow">
          {props.data.map((item) => (
            <li className="flex justify-between gap-2" key={item.title}>
              <strong className="flex items-center text-sm">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.bgColor }}
                />
                &nbsp;
                {item.title}
              </strong>

              <strong>
                {item.value}
                &nbsp;
                <span className="text-gray-500 text-sm">
                  {((item.value / total) * 100).toFixed(2)}%
                </span>
              </strong>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default CampaignsSection;
