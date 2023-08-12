import React from 'react'
import SideBar from '../components/SideBar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'
import { useAuth } from '../contexts/FakeAuthContext'
import User from '../components/User'

export default function AppLayout() {
  const {isAuthnticated} = useAuth();

  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      {isAuthnticated && <User />}
    </div>
  )
}
