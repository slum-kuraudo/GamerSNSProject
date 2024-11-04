import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import LinkBar  from '../components/appbar/LinkBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">

      <body className={inter.className}>
      <LinkBar />
        <main>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </main>
      </body>
    </html>
  )
}