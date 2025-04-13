import React from 'react'
import HomeScreen from './HomeScreen'
import LandingScreen from './LandingScreen'

const HomePage = () => {
  const user=false

  return <>
    {user ? <HomeScreen /> : <LandingScreen /> }
    </>
}

export default HomePage