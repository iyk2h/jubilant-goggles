import Script from "next/script";
import "./globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        id="smartlook"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '840e1fe5802bb8834e995bca454870f8053cb9a3', { region: 'eu' });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
