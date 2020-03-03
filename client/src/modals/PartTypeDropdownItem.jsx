import React from 'react';

const PartTypeDropdownItem = (props) => {

  const clickPartType = (e) => {
    props.updatePartHandler(e.target.id)
  }

  return (
    <a onClick={clickPartType} id={props.part.toLowerCase().indexOf('custom') >= 0 ? 'custom' : props.part} className="dropdown-item pointer" >{props.part}</a>
  )
}

export default PartTypeDropdownItem;