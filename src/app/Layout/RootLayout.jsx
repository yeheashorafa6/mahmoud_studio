import "./../globals.css";
import "./../fontStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import DrawingComponent from "@/components/ui/DrawingComponent";

import { Metadata } from 'next';
import Head from "next/head";

export const getMetadata =   {

    // metadataBase: new URL("https://mahmoud-studio.vercel.app"),
    title: {
      default: 'mahmoud_studio',
      template: '%s | mahmoud_studio',
    },
    description: 'مرحبًا بكم في الموقع الشخصي...',
    link: "/assets/docLogo.ico"
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DrawingComponent />
          <Head>
          <link rel="icon" href="/assets/docLogo.ico" />
        {/* يمكنك إضافة المزيد من العناصر هنا */}
      </Head>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}