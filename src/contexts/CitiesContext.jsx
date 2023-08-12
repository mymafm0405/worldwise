import { createContext, useState, useEffect, useContext, useReducer } from "react"

const CitiesProvider = createContext()
const BASE_URL = "http://localhost:8000";

const initialState = {
    cities: [],
    loading: false,
    currentCity: {},
    error: ''
}
function reducer(state, action) {
    switch (action.type) {
        case 'rejected':
            return { ...state, loading: false, error: action.payload }
        case 'loading':
            return { ...state, loading: true }
        case 'cities/loaded':
            return { ...state, loading: false, cities: action.payload }
        case 'city/loaded':
            return { ...state, loading: false, currentCity: action.payload }
        case 'city/created':
            return { ...state, loading: false, cities: [...state.cities, action.payload], currentCity: action.payload }
        case 'city/deleted':
            return { ...state, loading: false, cities: state.cities.filter(city => city.id !== action.payload), currentCity: {} }
        default:
            throw new Error('Unknow action')
    }
}

function CitiesContext({ children }) {
    const [{ cities, loading, currentCity }, dispatch] = useReducer(reducer, initialState);

    // const [cities, setCities] = useState([]);
    // const [loading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        dispatch({ type: 'loading' })
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data })
            } catch (e) {
                dispatch({ type: 'rejected', payload: 'Failed to load the cities' })
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        if (currentCity.id === +id) return;
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data })
        } catch (error) {
            dispatch({ type: 'rejected', payload: 'Failed to load the city' })
        }
    }

    async function createCity(newCity) {
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            dispatch({ type: 'city/created', payload: data })
        } catch (error) {
            dispatch({ type: 'rejected', payload: 'Failed to create the city' })
        }
    }

    async function deleteCity(id) {
        dispatch({ type: 'loading' })
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            })
            dispatch({ type: 'city/deleted', payload: id })

        } catch (error) {
            dispatch({ type: 'rejected', payload: 'Failed to delete the city' })
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