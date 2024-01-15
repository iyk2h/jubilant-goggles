import "./globals.css";
import MyHeader from "../components/MyHeader";
import AirportInfosProvider from "./AirportProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { useLocale, NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

export const metadata = {
  metadataBase: new URL("https://sky-nap-guide.vercel.app/"),
  title: "Sky Nap Guide",
  description: "Generated by create next app",
  openGraph: {
    images: ["/thumbnail.jpg"],
  },
};

export default function RootLayout({ children, params }) {
  const locale = useLocale();
  const messages = useMessages();
  const t = useTranslations("Head");

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DESYR520TS"
        ></Script>
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-DESYR520TS');
        `}
        </Script>
      </>
      <body className="select-none">
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone="Asia/Seoul"
        >
          <AirportInfosProvider>
            <div className="container">
              <MyHeader headText={t("title")} />
              {children}
            </div>
          </AirportInfosProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleTagManager gtmId="GTM-TFZ2VB2Q" />
    </html>
  );
}
