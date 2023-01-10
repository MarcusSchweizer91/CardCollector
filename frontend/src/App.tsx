import React from 'react';
import './App.css';
import PokemonApp from "./CardGallery/components/PokemonCards/PokemonApp";
import NavBar from "./CardGallery/components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExchangeApp from "./CardGallery/components/CardExchange/ExchangeApp";
import PokemonDetails from "./CardGallery/components/PokemonCards/PokemonDetails";
import ExchangeDetails from "./CardGallery/components/CardExchange/ExchangeDetails";
import LoginPage from "./CardGallery/components/LoginPage";
import useUser from "./CardGallery/components/hooks/useUser";
import ProtectedRoutes from "./CardGallery/components/ProtectedRoutes";
import RegisterForm from "./CardGallery/RegisterForm";

function App() {

    const {username, login, logout, register} = useUser();


  return (
    <div className="App">
        <BrowserRouter>
            <NavBar logout={logout}/>
            <h2>{username}</h2>
            <Routes>
                <Route path={"/"} element={<PokemonApp/>}></Route>
                <Route path={"/login"} element={<LoginPage login={login}/>}></Route>
                <Route path={"/register"} element={<RegisterForm register={register}/>}></Route>

                <Route element={
                    <ProtectedRoutes username={username} />
                }>
                    <Route path={"/exchange"} element={<ExchangeApp/>}></Route>
                    <Route path={"/details/:id"} element={<PokemonDetails/>}></Route>
                    <Route path={"/exchange/:id"} element={<ExchangeDetails/>}></Route>
                    <Route path={"/users"} element={<PokemonApp/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
