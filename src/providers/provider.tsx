import I18nProvider from "./i18n.provider";

const Provider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
};

export default Provider;
