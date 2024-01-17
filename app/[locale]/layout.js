import "./globals.css";
import MyHeader from "../components/MyHeader";
import AirportInfosProvider from "./AirportProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { useLocale, NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import KakaoScript from "../components/KakaoScript";

export async function generateMetadata({ params }) {
  const title = params.locale === "ko" ? "시차해결사" : "LagLess";
  const description =
    params.locale === "ko"
      ? "여행 중에 최적의 낮잠 시간을 추천받아 시차를 최소화하세요."
      : "Receive recommendations for the optimal nap time during your travels to minimize the effects of jet lag.";
  return {
    metadataBase: new URL("https://sky-nap-guide.vercel.app/"),
    openGraph: {
      title: title,
      description: description,
      images: ["/thumbnail.jpg"],
      siteName: title,
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
        <title>{params.locale === "ko" ? "시차해결사" : "LagLess"}</title>
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
      <KakaoScript />
      <GoogleTagManager gtmId="GTM-TFZ2VB2Q" />
    </html>
  );
}
