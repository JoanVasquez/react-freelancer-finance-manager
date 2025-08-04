'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import GenericButton from '../ui/GenericButton'
import { sidebarLinks } from '@/config/navigation'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '@/features/thunks/userThunks'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <aside className="sidebar">
      <div className="sidebar__header">Finance Manager</div>
      <nav className="sidebar__nav">
        {sidebarLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="sidebar__footer">
        <ThemeToggle />
        <GenericButton
          label="Logout"
          variant="danger"
          className="w-full"
          onClick={() => {
            dispatch(logoutThunk() as any)
            router.push('/login')
          }}
        />
      </div>
    </aside>
  )
}
