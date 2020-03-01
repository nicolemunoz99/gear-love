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
    <li class={`nav-item ${dd ? "dropdown" : null}`}>
      <a onClick={handleNavClick}
          className={`nav-link active ${dd ? "dropdown-toggle" : null}`} 
          id={props.handler.arg}
          data-toggle={dd ? "dropdown" : null}
      >
        {props.title}
      </a>
      {props.dropdown ?
      <div class="dropdown-menu" aria-labelledby={'parts'}>
        {props.dropdown.map(ddItem => {
            
            return (
              <a id={ddItem} onClick={ddItem.fn} class="dropdown-item">{ddItem.title}</a>
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
