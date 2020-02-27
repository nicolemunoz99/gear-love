import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import profileData from './sampleData/userProfile.js'; // eventually delete

import Nav from './Nav.jsx';
import BikesList from './BikesList.jsx';
import PartsList from './PartsList.jsx';
import ModalIndex from './modals/ModalIndex.jsx';
import Landing from './Landing.jsx';

import urls from '../../urls.js';

const cookieName = 'bikebikebike';

const App = (props) => {
  const [userProfile, setProfile] = useState(null);
  const [currentBike, changeBike] = useState({});
  const [partsList, changeParts] = useState([]);
  
  const [modal, changeModal] = useState(null); // null, signup, login, newPart, postSuccess
  const [view, changeView] = useState('landing'); // bikeList, parts, newPartForm, landing

  useEffect(() => {
    // no cookie
    if (document.cookie.indexOf(cookieName) < 0) {
      changeView('landing')
    }
    // has cookie
    let session = document.cookie.split(`${cookieName}=`)[1];
    console.log('session', session);
    (async () => {
      let profileResponse = await axios.get(`${urls.api}/users/login?session=${session}`);
      if (profileResponse.status === 209) { changeView('landing'); return }
      if (profileResponse.status === 227) {changeView ('landing'); return } // TO DO modal to prompt user to grant appropriate scope
      console.log('resp', profileResponse)
      handleLogin(profileResponse.data);
    })();
    
  }, []);

  let distUnits = userProfile && userProfile.measurement_preference === 'feet' ? 'miles' : 'km';
  let lastActivity = userProfile ? {id: userProfile.last_ride_id, name: userProfile.last_ride_name} : null;

  const handleLogin = (profile) => {
    setProfile(profile);
    changeView('bikeList');
    changeModal(null);
    if (profile.session) { document.cookie = `${cookieName}=${profile.session};max-age=${6 * 60 * 60}`; }
  };

  const handleLogout = async () => {
    console.log('session: ', document.cookie.split(`${cookieName}=`)[1])
    await axios.delete(`${urls.api}/users/logout?session=${document.cookie.split(`${cookieName}=`)[1]}`); // delete session from db
    document.cookie = `${cookieName}= ;max-age=${6 * 60 * 60}`; // remove cookie
    changeView('landing');
    setProfile(null);
  };

  const handleBikeSelect = async (bike) => {
    console.log('bike', bike)
    let parts = (await axios.get(`${urls.api}/parts?bike_id=${bike.bike_id}`)).data;
    console.log('parts', parts)
    changeParts(parts);
    changeBike(bike);
  };

  const viewHandler = (view) => {
    changeView(view);
  };

  return (
    <div className="mt-5 mb-5">
      { userProfile ?
      <div className="container">
        <Nav lastActivity={lastActivity} />
      </div>
      :
      null
      }
      <div className="container-fluid chain-love mb-5">
        <div className="row title-text ml-5">
          <div className="col-12">
            Bike.Bike.Bike.
          </div>
        </div>
      </div>

      <div className="container">

        {view === 'landing' ?
          <Landing changeModal={changeModal} />
          :
          null  
        }

        {view === 'bikeList' ?
          <BikesList viewHandler={viewHandler}
                      handleBikeSelect={handleBikeSelect}
                      bikes={userProfile.bikes}
                      distUnits={distUnits}
          />
          : null
        }
        {view === 'parts' ?
          <PartsList viewHandler={viewHandler}
                      changeModal={changeModal}
                      refreshPartsList={handleBikeSelect}
                      currentBike={currentBike}
                      partsList={partsList}
                      distUnits={distUnits}
          />
          : null
        }
        <ModalIndex distUnits={distUnits} 
                    bikeId={currentBike.bike_id}
                    handleLogin={handleLogin} 
                    modal={modal} 
                    changeModal={changeModal}
        />
      </div>
      
      { userProfile ?
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-8 text-center">
            <button className="btn btn-outline-dark full-width" onClick={handleLogout}>Log Out</button>
        </div>
        </div>
      </div>
      :
      null
      }

    </div>

  );
}

export default App;

