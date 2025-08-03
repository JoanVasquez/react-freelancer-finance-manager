import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { persistor, store } from '@/features'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Freelancer Finance Manager',
  description: 'Track invoices, expenses, income & taxes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
