import React from 'react';
import InfoTooltip from './InfoTooltip';

function TechnicalUIApp({ tooltipStatus, isInfoToolTipOpen, setIsInfoToolTipOpen }) {

    function closeTechnicalUIPopups() {
        setIsInfoToolTipOpen(false);
      }

  return (
    <>
        <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeTechnicalUIPopups}
            status={tooltipStatus}
        />
    </>
    
  );
}

export default TechnicalUIApp;
