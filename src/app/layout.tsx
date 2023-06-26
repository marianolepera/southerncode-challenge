import { Providers } from '@/store/provider';
import { Metadata } from 'next'
import ThemeRegistry from '@/themes/ThemeRegistry';

export const metadata: Metadata = {
  title: 'southern code challenge',
  description: '...',
}

const bodyStyle = {
  margin: 0,
  backgroundColor: "#eeeeee"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode

}) {
  return (
    <html lang="en">
      <body style={bodyStyle}>
        <Providers>
          <ThemeRegistry>{children}</ThemeRegistry>
        </Providers>
      </body>
    </html>
  )
}
