import type { Metadata } from "next";
import "./globals.scss";
import { Outfit, Jost, Crimson_Pro } from "next/font/google";

const outfit_bold = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--tp-ff-body",
});
const outfit_heading = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--tp-ff-heading",
});
const outfit_p = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--tp-ff-p",
});
const jost_primary = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--tp-ff-primary",
});
const crismon_secondary = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--tp-ff-secondary",
});

export const metadata: Metadata = {
  title: "CCGE - Center for Corporate Governance & Excellence",
  description:
    "CCGE offers world-class professional courses including CPA, CMA, ACCA, CFA, EA, UK Taxation & Accounting, and more. Expert faculty and comprehensive training for finance and accounting professionals.",
  icons: {
    icon: "/assets/img/favicon.ico",
    shortcut: "/assets/img/favicon.ico",
    apple: "/assets/img/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit_bold.variable} ${outfit_heading.variable} ${outfit_p.variable} ${jost_primary.variable} ${crismon_secondary.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
