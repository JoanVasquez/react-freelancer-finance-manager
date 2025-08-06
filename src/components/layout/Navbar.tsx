'use client'

import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/features'

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.currentUser)

  console.log(user)
  return (
    <header className="navbar">
      <h2 className="navbar__title">Freelancer Finance Manager</h2>
      <div className="navbar__right">
        {user && <span>👋 {user.name || 'User'}</span>}
        <LogoutButton />
      </div>
    </header>
  )
}
