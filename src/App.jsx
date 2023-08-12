import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Pricing from "./Pages/Pricing";
import Product from "./Pages/Product";
import PageNotFound from "./Pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesContext } from "./contexts/CitiesContext";
import { AuthContextProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoutes";



export default function App() {

  return (
    <AuthContextProvider>
      <CitiesContext>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route
                index
                element={<Navigate to='cities' replace />}
              />
              <Route
                path="cities"
                element={<CityList />}
              />
              <Route path="cities/:id" element={<City />} />
              <Route
                path="countries"
                element={<CountryList />}
              />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesContext>
    </AuthContextProvider>
  );
}
