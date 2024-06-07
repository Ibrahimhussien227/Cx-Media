import type { PropsWithChildren } from "react";

const cardThemes = {
  frosted: "bg-gradient-blue-white border border-slight",
};

export const Card = ({
  theme,
  ...props
}: PropsWithChildren<{
  className?: string;
  theme?: keyof typeof cardThemes;
}>) => {
  return (
    <div
      className={
        "bg-white flex-col flex rounded-sm" +
        (theme ? ` ${cardThemes[theme]}` : "") +
        (props.className ? ` ${props.className}` : "")
      }
    >
      {props.children}
    </div>
  );
};

export const CardHeader = (
  props: PropsWithChildren<{
    className?: string;
    borderVariant?: "bottom-primary";
  }>,
) => {
  return (
    <header
      className={
        "flex items-center justify-between px-4 text-primary pt-4 bg-white" +
        (props.className && ` ${props.className}`) +
        (props.borderVariant === "bottom-primary"
          ? " border-solid border-b-[0.0625rem] border-secondary/10 pb-2 mx-2"
          : "")
      }
    >
      {props.children}
    </header>
  );
};

export const CardBody = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={`p-4 ${props.className && props.className}`}>
      {props.children}
    </div>
  );
};
