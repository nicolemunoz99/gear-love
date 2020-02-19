import React, { useState } from 'react';

const Modal = (props) => {

  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      props.changeModal(null)
    }
  };

  return (

    <div onClick={closeHandler} className="d-flex justify-content-center chainlove-modal-backdrop">
      <div className={`col-11 col-md-${props.width} col-lg-${props.width-2} chainlove-modal p-5 border rounded`}>
        <div className="close-me" onClick={closeHandler}>cancel</div>
        <div className="h3 mb-3">{props.title}</div>
        {props.children}
      </div>
    </div>

  )
}

export default Modal;