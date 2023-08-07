import React from 'react'
import Spinner from './Spinner'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Message from './Message'

export default function CityList({cities, loading}) {
  if (loading) return <Spinner /> 
  if (!cities.length) return <Message message="Add your first city by selecting it from them map."/>
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.cityName} />)}
    </ul>
  )
}
