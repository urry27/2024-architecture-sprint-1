import React from 'react';
import ProfileApp from 'profile_managements/ProfileApp';
import PlacesApp from 'place_management/PlacesApp';
import TechnicalUIApp from 'technical_ui/TechnicalUIApp';

function Main({ cards, setCurrentUser, setCards, tooltipStatus, isInfoToolTipOpen, setIsInfoToolTipOpen }) {

  return (
    <main className="content">
        <ProfileApp setCurrentUser={setCurrentUser} />
        <PlacesApp cards={cards} setCards={setCards}  />
        <TechnicalUIApp 
          tooltipStatus={tooltipStatus}
          isInfoToolTipOpen={isInfoToolTipOpen}
          setIsInfoToolTipOpen={setIsInfoToolTipOpen} />
    </main>
  );
}

export default Main;