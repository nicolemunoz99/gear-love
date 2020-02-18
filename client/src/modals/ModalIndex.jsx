import React, { useState } from 'react';
import LoginModal from './LoginModal.jsx';
import NewPartModal from './NewPartModal.jsx'

const ModalIndex = (props) => {
   
  return (
    <div>
      {props.modal === 'newPart' ?
        <NewPartModal changeModal={props.changeModal}/>
        : null
      }
    </div>
  )
}

export default ModalIndex