import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const {isAuthnticated} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthnticated) navigate('/')
    }, [])

    return isAuthnticated ? children : null
}