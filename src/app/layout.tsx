import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { jaJP } from '@clerk/localizations'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import Header from '@/components/appbar/Header';
import NewPost from '@/components/appbar/NewPost';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlayFeed',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  if (typeof window === 'undefined') {
    console.log('server')
  } else {
    console.log('client')
  }
  return (
    // <ClerkProvider>
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={inter.className}>
          <main>
            <AppRouterCacheProvider>
              <Header />
              <NewPost />
              {children}
            </AppRouterCacheProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}