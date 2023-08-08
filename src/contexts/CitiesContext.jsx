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

    return <CitiesProvider.Provider value={{
        cities, loading, getCity, currentCity
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