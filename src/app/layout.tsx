// import './globals.css'
"use client";
import { ThemeProvider } from '@mui/material'
import theme from '@/themes/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

const queryClient = new QueryClient()

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
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </Providers>
        </body>
      </ThemeProvider>
    </html>
  )
}
