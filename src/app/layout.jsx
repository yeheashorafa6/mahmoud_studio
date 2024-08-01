import RootLayout from './Layout/RootLayout';
import ConditionalLayout from './Layout/ConditionalLayout';

export const metadata = {

    title: {
        default: 'mahmoud_studio',
        template: '%s | mahmoud_studio',
      },
    description: 'مرحبًا بكم في الموقع الشخصي mahmoud_studio، مصمم جرافيك محترف. استمتعوا بمشاهدة أحدث أعمالي المبدعة في تصميم الشعارات، الهويات البصرية، والتصاميم الإعلانية. اكتشفوا إبداعاتي وتعرفوا على الخدمات التي أقدمها لتلبية احتياجاتكم التصميمية بأعلى جودة واحترافية',
    openGraph: {
        images: [
          {
            url: '/assets/logo.png',
            width: 1200,
            height: 630,
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