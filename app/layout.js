
import "./globals.css";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { LangProvider } from "./lang-provider";
import TopBar from "./top-bar";

const font = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "كودك | Kodak",
  description: "كودك: منصة للأطباء ولوحة المطالبات | Kodak: doctor portal and claims dashboard",
};

export default function RootLayout({ children }) {
  const lang = cookies().get("lang")?.value === "en" ? "en" : "ar";
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={font.variable}>
      <body className="font-sans min-h-screen">
        <LangProvider initial={lang}>
          <TopBar />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
