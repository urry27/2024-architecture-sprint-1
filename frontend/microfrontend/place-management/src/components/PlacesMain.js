import React from 'react';
import Card from './Card';

function PlacesMain({ cards, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

  return (
      <section className="places page__section">
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
  );
}

export default PlacesMain;
