'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import GenericButton from '../ui/GenericButton'
import { sidebarLinks } from '@/config/navigation'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '@/store/thunks/userThunks'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        Finance Manager
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {sidebarLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 space-y-2">
        <ThemeToggle />
        <GenericButton
          label="Logout"
          className="w-full bg-red-500 p-2 rounded"
          onClick={() => {
            dispatch(logoutThunk() as any)
            router.push('/login')
          }}
        />
      </div>
    </aside>
  )
}
