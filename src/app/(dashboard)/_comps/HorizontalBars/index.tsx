import { Fragment, useMemo } from "react";

import { IHorizontalBarsProps } from "./type";

const HorizontalBars = (props: IHorizontalBarsProps) => {
  const xAxisMax = useMemo(
    () =>
      props.xAxisMax ??
      props.data.reduce((acc, item) => Math.max(acc, item.value), 0),
    [props.xAxisMax, props.data],
  );
  const xAxisLabelsSizeHolder = useMemo(
    () =>
      "_"
        .repeat(Math.ceil(xAxisMax / props.xAxisStep))
        .toString()
        .split("_"),
    [xAxisMax, props.xAxisStep],
  );

  return (
    <div
      className="grid grid-cols-3 gap-x-4 gap-y-2 items-center"
      style={{
        gridTemplateColumns: "auto 1fr auto",
      }}
    >
      {props.data.map((item, index) => (
        <Fragment key={index}>
          <p className="text-sm w-fit mt-2.5">{item.title}</p>
          <div className="h-5 bg-gray-100 mt-2">
            <div
              className="h-5 rounded-e-[0.25rem]"
              style={{
                width: `${(item.value / xAxisMax) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <p className="text-sm w-fit mt-2.5 font-bold">{item.value}</p>
        </Fragment>
      ))}
      <span />
      <div
        className="grid"
        style={{
          gridTemplateColumns: xAxisLabelsSizeHolder.map(() => "1fr").join(" "),
        }}
      >
        {xAxisLabelsSizeHolder.map((_, index) => (
          <p
            key={index}
            className="text-xs font-bold text-gray-500 text-center"
            style={{
              justifySelf:
                index === 0
                  ? "start"
                  : index === xAxisLabelsSizeHolder.length - 1
                  ? "end"
                  : "center",
            }}
          >
            {props.xAxisLabel(index * props.xAxisStep)}
          </p>
        ))}
      </div>
      <span />
    </div>
  );
};

export default HorizontalBars;
