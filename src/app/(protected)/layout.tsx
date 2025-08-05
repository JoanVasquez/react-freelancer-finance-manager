// src/app/(protected)/layout.tsx
'use client'

import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarWidth = 250 // Debe coincidir con Sidebar.scss

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f9f9f9' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
