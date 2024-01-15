import "./globals.css";
import MyHeader from "../components/MyHeader";
import AirportInfosProvider from "./AirportProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { useLocale, NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }) {
  const title = params.locale === "ko" ? "시차해결사" : "LagLess";
  const description =
    params.locale === "ko"
      ? "여행 도중 최적의 낮잠 시간을 추천하는 앱! ✈️ 피로를 최소화하고 여행을 더 즐겁게 즐겨보세요."
      : "An app recommending the optimal nap time during your travels! ✈️ Minimize fatigue and make your journey even more enjoyable.";
  return {
    metadataBase: new URL("https://sky-nap-guide.vercel.app/"),
    title: title,
    description: description,
    openGraph: {
      images: ["/thumbnail.jpg"],
    },
  };
}

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
