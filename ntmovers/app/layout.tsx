import {GeistSans} from "geist/font/sans";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/system";
import {Providers} from "@/components/NextUI/Providers";
import {MapProvider} from "@/app/Providers/MapProvider";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "NT MOVERS",
    description: "Local and Cross Border Movers",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
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
