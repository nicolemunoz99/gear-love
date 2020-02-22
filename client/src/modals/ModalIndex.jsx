import React, { useState } from 'react';
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';
import NewPartModal from './NewPartModal.jsx';


const ModalIndex = (props) => {
   
  return (
    <div>
      {props.modal === 'newPart' ?
        <NewPartModal bikeId={props.bikeId} distUnits={props.distUnits} changeModal={props.changeModal}/>
        : null
      }
      {props.modal === 'signup' ?
        <SignupModal changeModal={props.changeModal} />
        : null
      }
      {props.modal === 'login' ?
        <LoginModal setProfile={props.setProfile} changeModal={props.changeModal} />
        : null
      }
    </div>
  )
}

export default ModalIndex