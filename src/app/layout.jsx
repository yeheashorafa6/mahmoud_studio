import RootLayout from './Layout/RootLayout';
import ConditionalLayout from './Layout/ConditionalLayout';

export const metadata = {
    metadataBase: new URL("https://mahmoud-studio.vercel.app"),
    title: {
        default: 'mahmoud_studio',
        template: '%s | mahmoud_studio',
      },
    description: 'مرحبًا بكم في الموقع الشخصي انا محمود الشرفا، مصمم جرافيك محترف. استمتعوا بمشاهدة أحدث أعمالي المبدعة في تصميم الشعارات، الهويات البصرية، والتصاميم الإعلانية. اكتشفوا إبداعاتي وتعرفوا على الخدمات التي أقدمها لتلبية احتياجاتكم التصميمية بأعلى جودة واحترافية',
    openGraph: {
        images: [
          {
            url: '/assets/docLogo.png',
            width: 100,
            height: 50,
          },
        ],
      },
};

export default function Layout({ children }) {
  return (
    <RootLayout>
      <ConditionalLayout>{children}</ConditionalLayout>
    </RootLayout>
  );
}