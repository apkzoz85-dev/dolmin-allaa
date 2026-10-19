import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Instrument_Serif } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

// ===== Google Ads tag — replace AW-XXXXXXXXXX with the account ID =====
const GA_ID = "AW-XXXXXXXXXX";

export const metadata: Metadata = {
  title: "سوتو القاهرة الجديدة | SOTO by Dolmen Developments — EOI 100,000 مسترد بالكامل",
  description:
    "سوتو SOTO من دولمن للتطوير على محور محمد نجيب بجوار الجامعة الأمريكية بالقاهرة الجديدة. شقق 1 و2 و3 غرف وبنتهاوس، مقدم 10% وتقسيط حتى 10 سنوات، استلام 4 سنوات، EOI 100,000 جنيه مسترد بالكامل.",
  keywords: [
    "سوتو القاهرة الجديدة",
    "SOTO New Cairo",
    "دولمن للتطوير",
    "Dolmen Developments",
    "كمبوند سوتو",
    "شقق التجمع الخامس",
    "محور محمد نجيب",
  ],
  openGraph: {
    title: "SOTO — New Cairo | Dolmen Developments",
    description: "Heritage reimagined. 10% down payment, up to 10 years. EOI 100,000 EGP fully refundable.",
    images: ["/images/og.jpg"],
    locale: "ar_EG",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${plex.variable} ${instrument.variable}`}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
