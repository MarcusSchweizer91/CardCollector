import React from 'react';
import './App.css';
import PokemonApp from "./CardGallery/components/PokemonCards/PokemonApp";
import NavBar from "./CardGallery/components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExchangeApp from "./CardGallery/components/CardExchange/ExchangeApp";
import PokemonDetails from "./CardGallery/components/PokemonCards/PokemonDetails";
import ExchangeDetails from "./CardGallery/components/CardExchange/ExchangeDetails";
import LoginPage from "./CardGallery/components/user/LoginPage";
import useUser from "./CardGallery/components/hooks/useUser";
import ProtectedRoutes from "./CardGallery/components/ProtectedRoutes";
import RegisterForm from "./CardGallery/components/user/RegisterForm";
import UserDetails from "./CardGallery/components/user/UserDetails";
import useFavorites from "./CardGallery/components/hooks/useFavorites";
import UserChat from "./CardGallery/components/Chat/UserChat";




function App() {

    const {userInfo, login, logout, register} = useUser();

    const{favorites, addCardToFavorites, getFavoriteCards, isCardInFavorites, removeCardFromFavorites} = useFavorites()

  return (
    <div className="App">
        <BrowserRouter>
            <NavBar logout={logout}/>
            <Routes>
                <Route path={"/"} element={<PokemonApp addCardToFavorites={(id) => addCardToFavorites(id, favorites)} removeCardFromFavorites={removeCardFromFavorites} isCardInFavorites={isCardInFavorites}/>}></Route>
                <Route path={"/login"} element={<LoginPage login={login}/>}></Route>
                <Route path={"/register"} element={<RegisterForm register={register}/>}></Route>

                <Route element={
                    <ProtectedRoutes userInfo={userInfo} />
                }>
                    <Route path={"/exchange"} element={<ExchangeApp/>}></Route>
                    <Route path={"/details/:id"} element={<PokemonDetails/>}></Route>
                    <Route path={"/exchange/:id"} element={<ExchangeDetails/>}></Route>
                    <Route path={"/user"} element={<UserDetails isCardInFavorites={isCardInFavorites} addCardToFavorites={(id) => addCardToFavorites(id, favorites)} removeCardFromFavorites={removeCardFromFavorites} getFavoriteCards={getFavoriteCards}  userInfo={userInfo}/>}></Route>
                    <Route path="/chat/:receiverUsername" element={<UserChat />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
