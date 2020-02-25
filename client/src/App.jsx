import React, { useState, useEffect } from 'react';
import axios from 'axios';


// import profileData from './sampleData/userProfile.js'; // eventually delete

import BikesList from './BikesList.jsx';
import PartsList from './PartsList.jsx';
import ModalIndex from './modals/ModalIndex.jsx';
import Landing from './Landing.jsx';

import urls from '../../urls.js';

const cookieName = 'bikebikebike';

const App = (props) => {
  const [sessionId, updateSessionId] = useState(null);
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

  const handleSignUp = () => {
    changeModal('signup');
  }

  let distUnits = userProfile && userProfile.measurement_preference === 'feet' ? 'miles' : 'km'

  const handleLogin = (profile) => {
    setProfile(profile);
    changeModal(null);
    changeView('bikeList');

    // set profile.session as cookie
    if (profile.session) { document.cookie = `${cookieName}=${profile.session};max-age=${6 * 60 * 60}`; }
  }

  const handleBikeSelect = async (bike) => {
    console.log('bike', bike)
    let parts = (await axios.get(`${urls.api}/parts?bike_id=${bike.bike_id}`)).data;
    console.log('parts', parts)
    changeParts(parts);
    changeBike(bike);
  };

  const viewHandler = (view) => {
    if (view === 'parts') {
      // query
    }
    changeView(view);
  }

  return (
    <div className="mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            
            
          </div>
          <div className="col-12 mb-4">
            <button onClick={handleSignUp}> Sign Up</button>
          </div>
        </div>
      </div>
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
                      userProfile={userProfile}
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
    </div>

  );
}

export default App;

