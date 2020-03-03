import React, { useState, useEffect } from 'react';
import axios from 'axios';


// import profileData from './sampleData/userProfile.js'; // eventually delete

import Nav from './nav/NavIndex.jsx';
import BikesList from './BikesList.jsx';
import PartsList from './parts/PartsList.jsx';
import ModalIndex from './modals/ModalIndex.jsx';
import Landing from './Landing.jsx';

import urls from '../../urls.js';

const cookieName = 'bikebikebike';

const App = (props) => {
  const [userProfile, setProfile] = useState(null);
  const [currentBike, changeBike] = useState({});
  const [partsList, changeParts] = useState([]);
  
  const [modal, changeModal] = useState(null); // null, signup, login, newPart, postSuccess
  const [view, changeView] = useState(null); // bikeList, parts, newPartForm, landing

  useEffect(() => {

    // no cookie
    if (document.cookie.indexOf(cookieName) < 0) {
      changeView('landing')
    }
    // has cookie
    let session = document.cookie.split(`${cookieName}=`)[1];
    (async () => {
      let profileResponse = await axios.get(`${urls.api}/users/login?session=${session}`);
      if (profileResponse.status === 209) { changeView('landing'); return }
      if (profileResponse.status === 227) {changeView ('landing'); return } 
      // TO DO modal to prompt user to grant appropriate scope
      handleLogin(profileResponse.data);
    })();
    
  }, []);

  let distUnits = userProfile && userProfile.measurement_preference === 'feet' ? 'miles' : 'km';

  const handleLogin = (profile) => {
    setProfile(profile);
    changeView('bikeList');
    changeModal(null);
    if (profile.session) { document.cookie = `${cookieName}=${profile.session};max-age=${6 * 60 * 60}`; }
  };

  const handleLogout = async () => {
    await axios.delete(`${urls.api}/users/logout?session=${document.cookie.split(`${cookieName}=`)[1]}`); // delete session from db
    document.cookie = `${cookieName}= ;max-age=${6 * 60 * 60}`; // remove cookie
    changeView('landing');
    setProfile(null);
  };

  const handleBikeSelect = async (bike) => {
    let parts = (await axios.get(`${urls.api}/parts?bike_id=${bike.bike_id}`)).data;
    await changeParts(parts);
    await changeBike(bike);
  };

  const refreshLastActivity = (e) => {

  };

  return (
    <div>
      
      
      <Nav changeView={changeView}
           userProfile={userProfile}
           changeModal={changeModal}
           refreshLastActivity={refreshLastActivity}
           handleLogout={handleLogout}
           handleBikeSelect={handleBikeSelect}
      />
      

      <div className="app-wrapper">

        {view === 'landing' ?
          <Landing changeModal={changeModal} />
          :
          null  
        }

        {view === 'bikeList' ?
          <BikesList changeView={changeView}
                      handleBikeSelect={handleBikeSelect}
                      bikes={userProfile.bikes}
                      distUnits={distUnits}
          />
          : null
        }
        {view === 'parts' ?
          <PartsList changeView={changeView}
                      changeModal={changeModal}
                      refreshPartsList={handleBikeSelect}
                      currentBike={currentBike}
                      partsList={partsList}
                      distUnits={distUnits}
          />
          : null
        }
        
      </div>
      <ModalIndex 
        distUnits={distUnits} 
        currentBike={currentBike}
        handleLogin={handleLogin} 
        modal={modal} 
        changeModal={changeModal}
        changeParts={changeParts}
        />
    </div>

  );
}

export default App;

