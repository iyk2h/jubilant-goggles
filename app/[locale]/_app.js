import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/navigation";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
