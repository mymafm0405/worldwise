import React from "react";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities, loading } = useCities()
  
  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Please add some cities from the map!" />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((city) => arr.includes(city.country))) {
      return [...arr];
    } else {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
