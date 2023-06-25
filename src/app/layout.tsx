// import './globals.css'
// "use client";
import { ThemeProvider } from '@mui/material'
import theme from '@/themes/themes'
import { Providers } from '@/store/provider';
import { Metadata } from 'next'
import { NextAppDirEmotionCacheProvider } from "../themes/createEmotionCache";
import CssBaseline from "@mui/material/CssBaseline";
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
