import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api.js'
import profileData from './sampleData/userProfile.js'; // eventually delete
import bikePhotos from './sampleData/bikePhotos.js'; // eventually delete
import UnderConstructionModal from './UnderConstructionModal.jsx'; // eventually delete
import BikesList from './BikesList.jsx';
import PartsList from './PartsList.jsx';
import NewPartForm from './NewPartForm.jsx';
import cookie from '../helperFuncs/cookie.js';
import urls from '../../urls.js'
import strava from '../stravaAccess.js'


const App = (props) => {
  const [sessionId, updateSessionId] = useState(null);
  const [userProfile, setProfile] = useState(profileData);
  const [currentBike, changeBike] = useState(null);
  const [partsList, changeParts] = useState(null);
  const [partFormModal, updatePartFormView] = useState(false);
  const [view, changeView] = useState('bikeList'); //bikeList, parts, newPartForm
  const [progressModal, popup] = useState(false);


  useEffect(() => {
    let tempSessionId = cookie.hasSessionId();
    console.log('sessionId', tempSessionId)
    if (tempSessionId !== sessionId) { updateSessionId(tempSessionId) }
  }, []);

  const stravaApi = () => {
    let query = `?client_id=${strava.clientId}` +
                `&client_secret=${strava.client_secret}`
  }

  userProfile.bikes.forEach(bike => {
    bikePhotos.forEach(photo => {
      if (photo.bikeId === bike.id) {
        bike.url = photo.url
      }
    });
  })

  const handleBikeSelect = (bikeInfo) => {
    fetch(`${api}/${bikeInfo.id}/parts`)
      .then(response => response.json())
      .then(partsData => {
        console.log(partsData)
        changeParts(partsData);
        changeBike(bikeInfo);
        changeView('parts')
      })
  };

  const viewHandler = (view, modal) => {
    if (view === 'newPartForm') { updatePartFormView(true) }
    else { changeView(view) };
  }

  return (
    <div className="mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <a href={`https://www.strava.com/oauth/authorize` +
                      `?client_id=${strava.clientId}` +
                      `&response_type=code` +
                      `&redirect_uri=${urls.api}/signup/${sessionId}` +
                      `&approval_prompt=force&scope=read`}> 
              Register via Strava Oauth 2
            </a>
          </div>
          <div className="col-12">
            <button onClick={stravaApi}>Get data</button>
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
            bikeList={userProfile.bikes}
            popup={popup}
          /> :
          null
        }
        {view === 'parts' || view === 'newPartForm' ?
          <PartsList viewHandler={viewHandler} refreshPartsList={handleBikeSelect} currentBike={currentBike} partsList={partsList} /> :
          null
        }
        {partFormModal === true ?
          <NewPartForm currentBike={currentBike} updatePartFormView={updatePartFormView} popup={popup} /> :
          null
        }
        {progressModal ?
          <UnderConstructionModal popup={popup} /> :
          null
        }

      </div>
    </div>

  );
}

export default App;