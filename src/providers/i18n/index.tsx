import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

const I18nProvider = async ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  let messages;
  try {
    messages = (await import(`@/translations/${locale}.json`)).default;
  } catch (error) {
    console.error("Failed to load messages:", error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default I18nProvider;
