import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthnticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthnticated: true }
        case 'logout':
            return { ...state, user: null, isAuthnticated: false }
        default:
            throw new Error('Unknown action')
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthContextProvider({children}) {

    const [{ user, isAuthnticated }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (FAKE_USER.email === email && FAKE_USER.password === password) dispatch({ type: 'login', payload: FAKE_USER })
    }

    function logout() {
        dispatch({ type: 'logout' })
    }

    return <AuthContext.Provider value={{
        user,
        isAuthnticated,
        login,
        logout
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('Outside the scope of AuthContext')
    }

    return context;
}

export { AuthContextProvider, useAuth };