import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ProvidersWrapper from './ProvidersWrapper'
import './globals.scss'

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
        <ProvidersWrapper>
            {children}
        </ProvidersWrapper>
      </body>
    </html>
  )
}
