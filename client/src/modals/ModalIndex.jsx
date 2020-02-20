import React, { useState } from 'react';
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';
import NewPartModal from './NewPartModal.jsx';


const ModalIndex = (props) => {
   
  return (
    <div>
      {props.modal === 'newPart' ?
        <NewPartModal changeModal={props.changeModal}/>
        : null
      }
      {props.modal === 'signup' ?
        <SignupModal changeModal={props.changeModal} />
        : null
      }
      {props.modal === 'login' ?
        <LoginModal changeModal={props.changeModal} />
        : null
      }
    </div>
  )
}

export default ModalIndex