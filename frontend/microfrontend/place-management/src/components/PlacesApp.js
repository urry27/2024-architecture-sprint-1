import React from 'react';
import Card from './Card';
import PlacesMain from './PlacesMain';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import api from "../utils/api";
import CurrentUserContext from 'shared/CurrentUserContext';


function PlacesApp({ cards, setCards }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function closePlacesPopups() {
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closePlacesPopups();
      })
      .catch((err) => console.log(err));
  }

// тут функции

  return (
    <>
      <PlacesMain
        cards={cards}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closePlacesPopups} />
      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closePlacesPopups}
        />
    </>
    
  );
}

export default PlacesApp;
