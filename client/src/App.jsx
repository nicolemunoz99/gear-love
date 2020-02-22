import React, { useState, useEffect } from 'react';
import axios from 'axios';


import profileData from './sampleData/userProfile.js'; // eventually delete

import BikesList from './BikesList.jsx';
import PartsList from './PartsList.jsx';
import ModalIndex from './modals/ModalIndex.jsx';
import cookie from '../helperFuncs/cookie.js';
import urls from '../../urls.js';


const App = (props) => {
  const [sessionId, updateSessionId] = useState(null);
  const [userProfile, setProfile] = useState(profileData);
  const [currentBike, changeBike] = useState({});
  const [partsList, changeParts] = useState([]);
  const [modal, changeModal] = useState('newPart'); // null, signup, login, newPart
  
  const [view, changeView] = useState('bikeList'); // bikeList, parts, newPartForm

  useEffect(() => {
    let tempSessionId = cookie.hasSessionId();
    console.log('sessionId', tempSessionId)
    if (tempSessionId !== sessionId) { updateSessionId(tempSessionId) }
  }, []);

  const handleSignUp = () => {
    changeModal('signup')
  }

  let distUnits = userProfile.measurement_preference === 'feet' ? 'miles' : 'km'

  

  const handleBikeSelect = async (bike) => {
    let parts = (await axios.get(`${urls.api}/parts?bike_id=${bike.bike_id}`)).data;
    console.log('parts', parts)
    changeParts(parts);
    changeBike(bike);
    changeView('parts');

  };

  const viewHandler = (view, modal) => {
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
            Chain Love
          </div>
        </div>
      </div>
      <div className="container">

        {view === 'bikeList' || view === 'newPartForm' ?
          <BikesList viewHandler={viewHandler}
                      handleBikeSelect={handleBikeSelect}
                      userProfile={userProfile}
                      distUnits={distUnits}
          />
          : null
        }
        {view === 'parts' || view === 'newPartForm' ?
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
                    setProfile={setProfile} 
                    modal={modal} 
                    changeModal={changeModal}
        />
      </div>
    </div>

  );
}

export default App;