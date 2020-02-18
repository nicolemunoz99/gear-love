import React, { useState } from 'react';

const Modal = (props) => {
  
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      props.changeModal(null)
    }
  };

  return (
    <div onClick={closeHandler} className="d-flex justify-content-center modal-backdrop">
      <div className='chainlove-modal p-5 border rounded'>
        <div className="close-me" onClick={closeHandler}>cancel</div>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;