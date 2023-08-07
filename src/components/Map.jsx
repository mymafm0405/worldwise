import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h2>Position: Lat: {lat}, Lng: {lng}</h2>
      <button onClick={() => setSearchParams({lat: '23', lng: '50'})}>Change position</button>
    </div>
  )
}
