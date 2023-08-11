
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { createCity, loading } = useCities()

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition()
  const [emoji, setEmoji] = useState('')
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [cityError, setCityError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchData() {
      try {
        setIsLoadingData(true)
        setCityError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        if (!data.countryCode) throw new Error('There is no cities here, click on somewhere else 😉')
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode))
        console.log(data)
      } catch (err) {
        setCityError(err.message)
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchData()
  }, [lat, lng])

  if (cityError) return <Message message={cityError} />
  if (!lat || !lng) return <Message message='Please select somewhere on the map!' />
  if (isLoadingData) return <Spinner />

  async function handleAddCity(e) {
    e.preventDefault();
    if (!cityName || !date || !lat || !lng) return;

    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng
      }
    }
    await createCity(newCity)
    navigate('/app/cities')
  }
  return (
    <form className={`${styles.form} ${loading ? styles.loading : ''}`} onSubmit={handleAddCity}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={date => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>ADD</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
