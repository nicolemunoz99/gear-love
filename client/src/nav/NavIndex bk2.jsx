import React, { useEffect } from 'react';
import NavItem from './NavItem.jsx';
import NavPopup from './NavPopup.jsx';
import appName from '../appName.js';

const Nav = (props) => {
  let bikes;
  useEffect(() => {
    if (props.userProfile) {
      bikes = props.userProfile.bikes.map(bike => { return bike.name });
    }
  }, [props.userProfile])


  return (
    <nav>

    {!props.userProfile ?
      <div className="container">
        <div className="row text-center align-items-center">

          <div className="h1 col order-md-2 order-sm-1 order-xs-1">
            {appName}
          </div>

          <div className="col-12 order-sm-3 order-md-12">
            <button className="px-3 py-2 full-width">
              <div className="row justify-content-center"><i className="col m-auto material-icons">menu</i></div>
            </button>
          </div>
          <div className="col-md-auto order-md-1 order-sm-11 order-xs-2">
            <NavItem title="Sign up"
                    handler={{fn: props.changeModal, arg: 'signup'}} 
                    target={'modal'} 
            />
          </div>

          <div className="col-md-auto order-md-3 order-sm-12 order-xs-3">
            <NavItem title="Log in"
                      handler={{fn: props.changeModal, arg: 'login'}}
            />
          </div>
        </div>

      </div>
    
      :
      null
    }
    </nav>

  )
};

export default Nav;
