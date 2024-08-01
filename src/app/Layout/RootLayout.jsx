import "./../globals.css";
import "./../fontStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import DrawingComponent from "@/components/ui/DrawingComponent";

export const metadata = {
  metadataBase: new URL("https://mahmoud-studio.vercel.app"),
  title: 'mahmoud_studio',
  description: 'مرحبًا بكم في الموقع الشخصي mahmoud_studio، مصمم جرافيك محترف. استمتعوا بمشاهدة أحدث أعمالي المبدعة في تصميم الشعارات، الهويات البصرية، والتصاميم الإعلانية. اكتشفوا إبداعاتي وتعرفوا على الخدمات التي أقدمها لتلبية احتياجاتكم التصميمية بأعلى جودة واحترافية',
  openGraph: {
    images: [
      {
        url: '/assets/docLogo.png',
        width: 1200,
        height: 630,
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