import React from 'react'
import HomeScreen from './HomeScreen'
import LandingScreen from './LandingScreen'
import { useAuthStore } from '../../store/authStore.js'

const HomePage = () => {
  const {user}=useAuthStore()

  return <>
    {user ? <HomeScreen /> : <LandingScreen /> }
    </>
}

export default HomePage