import React from 'react';

//props:
// title: text to display
// handler: function (handler.fn) to exectue (with the element's id as argument(handler.arg)) when clicking

const NavItem = (props) => {

  const dd = props.dropdown ? true : false;

  const handleNavClick = (e) => {
    props.handler.fn(e.target.id);
  };

  return (
    <li className={`nav-item ${dd ? "dropdown" : null}`}>
      <a onClick={handleNavClick}
          className={`nav-link active ${dd ? "dropdown-toggle" : null}`} 
          id={props.handler.arg}
          data-toggle={dd ? "dropdown" : null}
      >
        {props.title}
      </a>
      {props.dropdown ?
      <div className="dropdown-menu" aria-labelledby={'parts'}>
        {props.dropdown.map((ddItem, i) => {
            
            return (
              <a key={i} id={ddItem} onClick={ddItem.fn} className="dropdown-item">{ddItem.title}</a>
            )
          })}
      </div>
      :
      null
      }
    </li>
  )
};

export default NavItem;
