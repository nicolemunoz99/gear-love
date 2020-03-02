import React, { useState, useEffect } from 'react';

const PartNav = (props) => {
  const [showNav, updateShowNav] = useState(false);

  useEffect(() => {
    if (showNav === true) {
      document.addEventListener('click', clickAnywhere)
    }
  }, [showNav])

  const clickAnywhere = () => {
    console.log('event')
    updateShowNav(false)
    document.removeEventListener('click', clickAnywhere)
  }
  
  const navToggle = (e) => {
    updateShowNav(!showNav)
  };



  return (
    <div>
    <nav className="container">
      <div className="row no-gutters">
        <div className="col-auto ml-auto">
            <i onClick={navToggle} className="material-icons pointer">menu</i>
        </div>
      </div>
      {showNav ?
      <div className="my-dropdown">
        <div className="my-dropdown-contents">
          <div>Edit</div>
          <div onClick={props.retire}>Retire</div>
          <div onClick={props.resetTracking}>Reset tracking</div>
        </div>
      </div>
      :
      null
      }
    </nav>
    </div>

  )
};

export default PartNav;