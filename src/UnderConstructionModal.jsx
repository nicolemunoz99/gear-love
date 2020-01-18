import React, {useState, useEffect} from 'react';

const UnderConstructionModal = (props) => {

  const hideModal = () => {
    props.popup(false);
  }

  return (
    <div onClick={hideModal} className="d-flex justify-content-center modal-backdrop">
      <div className="newPartForm p-5 border rounded">
        <p className="text-center">Feature under construction</p>
      </div>
      
    </div>)
}

export default UnderConstructionModal;