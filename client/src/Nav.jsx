import React from 'react';

const Nav = (props) => {

  const refreshLastActivity = (e) => {

  };

  return (
    <div className="row mb-4">
      <div className="col">
        <i onClick={refreshLastActivity} className="material-icons pointer">
            refresh
        </i>
          Last loaded activity: {props.lastActivity.name} 
      </div>
    </div>
  )
};

export default Nav;
