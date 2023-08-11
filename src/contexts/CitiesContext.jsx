import { createContext, useState, useEffect, useContext } from "react"

const CitiesProvider = createContext()
const BASE_URL = "http://localhost:8000";

function CitiesContext({ children }) {
    const [cities, setCities] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        async function fetchCities() {
            setIsLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                console.log(e);
                alert("there is an error");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json();
            setCurrentCity(data)
        } catch (error) {
            console.log(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setCities(cities => [...cities, data])
        } catch (error) {
            console.log(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            })
            setCities(cities => cities.filter(city => city.id !== id))

        } catch (error) {
            throw new Error('Error deleteing a city')
        } finally {
            setIsLoading(false)
        }
    }

    return <CitiesProvider.Provider value={{
        cities, loading, getCity, currentCity, createCity, deleteCity
    }}>
        {children}
    </CitiesProvider.Provider>
}

function useCities() {
    const context = useContext(CitiesProvider);
    if (context === undefined) {
        throw new Error('Outside of scope')
    }
    return context;
}

export { CitiesContext, useCities }