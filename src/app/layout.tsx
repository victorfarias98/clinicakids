import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
const geist=localFont({src:"../../brand/fonts/geist-latin.woff2",variable:"--font-geist",display:"swap"});
export const metadata:Metadata={title:"Happy Kids | Clínica Infantil em Paulo Afonso",description:"Cuidado integrado e acolhedor para bebês e crianças em Paulo Afonso. Odontopediatria, fonoaudiologia, psicologia, terapia ocupacional e fisioterapia infantil.",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"),alternates:{canonical:"/"},openGraph:{title:"Happy Kids | Clínica Infantil em Paulo Afonso",description:"Um lugar para crescer com saúde, confiança e alegria.",type:"website",locale:"pt_BR",images:["/illustrations/happy-kids-hero.png"]}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#f5f8f7"};
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  // Reading the CSP nonce here (set by proxy.ts) is required for Next.js to
  // thread it into its own script tags, and as a side effect opts this route
  // out of static prerendering — without it the nonce never reaches the
  // cached HTML and every script gets blocked by the nonce+strict-dynamic CSP.
  await headers();
  return <html lang="pt-BR" className={geist.variable}><body>{children}</body></html>;
}
