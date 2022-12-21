import React from 'react';
import './App.css';
import PokemonApp from "./CardGallery/components/PokemonCards/PokemonApp";
import NavBar from "./CardGallery/components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExchangeApp from "./CardGallery/components/CardExchange/ExchangeApp";
import PokemonDetails from "./CardGallery/components/PokemonCards/PokemonDetails";
import ExchangeDetails from "./CardGallery/components/CardExchange/ExchangeDetails";

function App() {


  return (
    <div className="App">
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path={"/"} element={<PokemonApp/>}></Route>
                <Route path={"/exchange"} element={<ExchangeApp/>}></Route>
                <Route path={"/user"} element={<PokemonApp/>}></Route>
                <Route path={"/details/:id"} element={<PokemonDetails/>}></Route>
                <Route path={"/exchange/:id"} element={<ExchangeDetails/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
