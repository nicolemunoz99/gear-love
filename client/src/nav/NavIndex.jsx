import React from 'react';
import appName from '../appName.js';
import NavItem from './NavItem.jsx';

const Nav = (props) => {


  const partsDropdown = props.userProfile ? props.userProfile.bikes.map(bike => {
    let fn = async () => {
      await props.handleBikeSelect(bike);
      await props.changeView('parts');
    }
    return {fn: fn, title: bike.name}
  }): null;

  return (
      <div>
      {!props.userProfile ?
      <nav className="navbar navbar-expand-sm main-nav fixed-top">
        <a className=" navbar-brand my-brand">{appName}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            
            <NavItem
              title="Sign up"
              handler={{fn: props.changeModal, arg: 'signup'}}
            />
            
            <NavItem 
              title="Log in"
              handler={{fn: props.changeModal, arg: 'login'}}
            />
          </ul>
        </div>
      </nav>
      :
      <nav className="navbar navbar-expand-sm main-nav fixed-top">
        <a className=" navbar-brand my-brand">{appName}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            
            <NavItem
              title="Bikes"
              handler={{fn: props.changeView, arg: 'bikeList'}}
            />
            
            <NavItem 
              title="Parts"
              handler={{fn: ()=>{}, arg: 'parts'}}
              dropdown={partsDropdown}
            />

            <NavItem 
              title="Log out"
              handler={{fn: props.handleLogout, arg: null}}
            />
          </ul>
        </div>
      </nav>
    }
    </div>
  )
};

export default Nav;
