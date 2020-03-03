import React, { useState } from 'react';
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';
import NewPartModal from './NewPartModal.jsx';
import PostSuccess from './PostSuccess.jsx';


const ModalIndex = (props) => {
   
  return (
    <div>

      {props.modal === 'newPart' ?
        <NewPartModal 
          currentBike={props.currentBike} 
          distUnits={props.distUnits} 
          changeModal={props.changeModal}
          changeParts={props.changeParts}/>
        : 
        null
      }
      {props.modal === 'signup' ?
        <SignupModal changeModal={props.changeModal} />
        : 
        null
      }
      {props.modal === 'login' ?
        <LoginModal handleLogin={props.handleLogin} changeModal={props.changeModal} />
        : 
        null
      }
      {props.modal === 'postSuccess' ?
        <PostSuccess changeModal={props.changeModal} />
        :
        null
      }

    </div>
  )
}

export default ModalIndex