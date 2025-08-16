'use client'

import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/features'
import Image from 'next/image'

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.currentUser)

  console.log(user)
  return (
    <header className="navbar">
      <h2 className="navbar__title">Freelancer Finance Manager</h2>
      <div className="navbar__right">
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingRight: '5px',
            cursor: 'pointer',
          }}
          onClick={() => console.log('Helloooo')}
        >
          <Image
            src="https://avatar.iran.liara.run/public/19"
            alt="Profile user imager"
            width={40}
            height={40}
            priority
          />
          {user && <span>👋 {user.name || 'User'}</span>}
        </span>
        <LogoutButton />
      </div>
    </header>
  )
}
