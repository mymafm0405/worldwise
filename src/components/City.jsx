import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams()
  useEffect(() => {
    getCity(id)
  }, [id])
  // TEMP DATA
  const { currentCity, getCity, loading } = useCities()

  if (loading) return <Spinner />
  const { cityName, emoji, date, notes } = currentCity;
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get('lat')
  // const lng = searchParams.get('lng')
  return (
    // <>
    // <h1>City id is: {id}</h1>
    // <h3>Position: Lat: {lat}, Lng: {lng}</h3>
    // </>
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* <div>
        <ButtonBack />
      </div> */}
    </div>
  );
}

export default City;
