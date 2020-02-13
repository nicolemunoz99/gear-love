import React, { useState, useEffect } from 'react';

const PartTypeDropdownItem = (props) => {

  const clickPartType = (e) => {
    props.updatePartHandler(e.target.id)
  }

  return (
    <a onClick={clickPartType} id={props.part} className="dropdown-item" >{props.part}</a>
  )
}

export default PartTypeDropdownItem;