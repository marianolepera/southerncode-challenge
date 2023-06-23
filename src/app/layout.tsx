// import './globals.css'
"use client";
import { ThemeProvider } from '@mui/material'
import theme from '@/themes/themes'
import { Providers } from '@/store/provider';
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'southern code challenge',
  description: '...',
}

const bodyStyle = {
  margin: 0,
  backgroundColor: theme.palette.secondary.light,
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body style={bodyStyle}>
          <Providers>
              {children}
          </Providers>
        </body>
      </ThemeProvider>
    </html>
  )
}
