import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
const geist=localFont({src:"../../brand/fonts/geist-latin.woff2",variable:"--font-geist",display:"swap"});
export const metadata:Metadata={title:"Happy Kids | Clínica Infantil em Paulo Afonso",description:"Cuidado integrado e acolhedor para bebês e crianças em Paulo Afonso. Odontopediatria, fonoaudiologia, psicologia, terapia ocupacional e fisioterapia infantil.",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"),alternates:{canonical:"/"},openGraph:{title:"Happy Kids | Clínica Infantil em Paulo Afonso",description:"Um lugar para crescer com saúde, confiança e alegria.",type:"website",locale:"pt_BR",images:["/illustrations/happy-kids-hero.png"]}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#f5f8f7"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR" className={geist.variable}><body>{children}</body></html>}
