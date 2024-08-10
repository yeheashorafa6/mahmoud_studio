import "./../globals.css";
import "./../fontStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import DrawingComponent from "@/components/ui/DrawingComponent";
import { SpeedInsights } from "@vercel/speed-insights/next"


 const metadata =   {

    metadataBase: new URL("https://mahmoud-studio.vercel.app"),
    title: {
      default: 'mahmoud_studio',
      template: '%s | mahmoud_studio',
    },
    description: 'مرحبًا بكم في الموقع الشخصي انا محمود الشرفا، مصمم جرافيك محترف. استمتعوا بمشاهدة أحدث أعمالي المبدعة في تصميم الشعارات، الهويات البصرية، والتصاميم الإعلانية. اكتشفوا إبداعاتي وتعرفوا على الخدمات التي أقدمها لتلبية احتياجاتكم التصميمية بأعلى جودة واحترافية',
    icons: {
      icon: '/assets/docLogo.ico'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
          <DrawingComponent />
          {children}
          <SpeedInsights />

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}