'use client'

import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarWidth = 250 // Debe coincidir con el CSS

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido alineado */}
      <div
        style={{
          marginLeft: `${sidebarWidth}px`, // Compensa el ancho del Sidebar
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
