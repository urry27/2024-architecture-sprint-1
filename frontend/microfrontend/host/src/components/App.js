import React, { useState, useEffect }  from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import './../index.css';
import 'technical_ui/styles';
import 'profile_managements/styles';
import 'place_management/styles';
import 'shared/styles';
import api from "../utils/api";
import * as auth from "../utils/auth.js";
import CurrentUserContext from 'shared/CurrentUserContext';
import Header from 'technical_ui/Header';
import Footer from 'technical_ui/Footer';
import ProtectedRoute from 'technical_ui/ProtectedRoute';
import Register from 'technical_ui/Register';
import Login from 'technical_ui/Login';
import Main from './Main';


const App = () => {

  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();
  
  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [navigate]);


  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    navigate("/signin");
  }

  // В компонент App внедрён контекст через CurrentUserContext.Provider
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header email={email} onSignOut={onSignOut} />
          <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute
                path="/"
                element={
                  <Main
                    cards={cards}
                    setCurrentUser={setCurrentUser}
                    setCards={setCards}
                    tooltipStatus={tooltipStatus}
                    isInfoToolTipOpen={isInfoToolTipOpen}
                    setIsInfoToolTipOpen={setIsInfoToolTipOpen}
                  />
                }
                loggedIn={isLoggedIn}
              />
              } 
            />
            <Route 
              path="/signup" 
              element={<Register setTooltipStatus={setTooltipStatus} setIsInfoToolTipOpen={setIsInfoToolTipOpen} />} 
            />
            <Route 
              path="/signin" 
              element={<Login setIsLoggedIn={setIsLoggedIn} setTooltipStatus={setTooltipStatus} setIsInfoToolTipOpen={setIsInfoToolTipOpen} />} 
            />
        </Routes>
        <Footer />
        </div>
      </CurrentUserContext.Provider>
    )
};

export default App;
