import "./../globals.css";
import "./../fontStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import DrawingComponent from "@/components/ui/DrawingComponent";

import { Metadata } from 'next';

export const getMetadata =   {

    metadataBase: new URL("https://mahmoud-studio.vercel.app"),
    title: {
      default: 'mahmoud_studio',
      template: '%s | mahmoud_studio',
    },
    description: 'مرحبًا بكم في الموقع الشخصي...',
    openGraph: {
      images: [
        {
          url: '/assets/docLogo.jpg',
          width: 1200,
          height: 630,
          alt: 'محمود ستوديو',
        },
      ],
    },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DrawingComponent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}