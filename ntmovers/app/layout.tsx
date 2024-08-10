import {GeistSans} from "geist/font/sans";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/system";
import {Providers} from "@/components/NextUI/Providers";
import {MapProvider} from "@/app/Providers/MapProvider";
import {customMetaDataGenerator} from "@/lib/customMetaDataGenerator";
import {Metadata} from "next";
import {viewport} from "@/lib/viewport-settings";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

// export const metadata = {
//     metadataBase: new URL(defaultUrl),
//     title: "NT MOVERS"
// };
export const metadata: Metadata = customMetaDataGenerator({
  title: 'NT MOVERS',
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
        <head>
            <link rel="icon" href="/favicon.ico"/>
            {/*<meta name="theme-color" content={viewport.themeColor}/>*/}
            {/*#7ABA78*/}
            <meta name="theme-color" media="(prefers-color-scheme: light)" content={viewport.themeColor}/>
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content={viewport.themeColor}/>

            <meta name="apple-mobile-web-app-status-bar-style" content={viewport.themeColor}/>
        </head>
        <body className="bg-background text-foreground">
        <Providers>
            <MapProvider>
            <main className="min-h-screen w-auto flex flex-col items-center">
                {children}
            </main>
            </MapProvider>
        </Providers>
        </body>
        </html>
    );
}
