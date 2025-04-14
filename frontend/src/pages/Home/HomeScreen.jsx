import React from 'react'
import { useAuthStore } from '../../store/authStore'

const HomeScreen = () => {
  const { logout } = useAuthStore()

  return (
    <div className='hero-bg'>
        <button onClick={logout}>
          Logout
        </button>
    </div>
  )
}

export default HomeScreen