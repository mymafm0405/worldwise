import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext'

export default function Map() {
  const { cities } = useCities()
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const [position, setPosition] = useState([40, 0])
  useEffect(() => {
    if (lat && lng) setPosition([lat, lng])
  }, [lat, lng])

  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map} center={position} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
          <Popup>
            <span>{city.emoji}</span><span>{city.cityName}</span>
          </Popup>
        </Marker>)}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
  return null;
}
