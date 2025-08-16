'use client'

import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/features'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.currentUser)

  return (
    <header className="navbar">
      <h2 className="navbar__title">Freelancer Finance Manager</h2>
      <div className="navbar__right">
        <Link
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingRight: '5px',
            textDecoration: 'none',
          }}
          href="/profile"
        >
          <Image
            src="https://avatar.iran.liara.run/public/19"
            alt="Profile user imager"
            width={40}
            height={40}
            priority
          />
          {user && <span>👋 {user.name || 'User'}</span>}
        </Link>
        <LogoutButton />
      </div>
    </header>
  )
}
