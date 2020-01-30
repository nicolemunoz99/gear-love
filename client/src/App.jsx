import React, { useState } from 'react';
import axios from 'axios';
import api from '../api.js'
import profileData from './sampleData/userProfile.js'; // eventually delete
import bikePhotos from './sampleData/bikePhotos.js'; // eventually delete
import UnderConstructionModal from './UnderConstructionModal.jsx'; // eventually delete
import BikesList from './BikesList.jsx';
import PartsList from './PartsList.jsx';
import NewPartForm from './NewPartForm.jsx'



const App = (props) =>{
  const [userProfile, setProfile] = useState(profileData);
  const [currentBike, changeBike] = useState(null);
  const [partsList, changeParts] = useState(null);
  const [partFormModal, updatePartFormView] = useState(false)
  const [view, changeView] = useState('bikeList'); //bikeList, parts, newPartForm
  const [progressModal, popup] = useState(false);


  // TO DO: photo database


  userProfile.bikes.forEach(bike => {
    bikePhotos.forEach(photo => {
      if (photo.bikeId === bike.id) {
        bike.url = photo.url
      }
    })
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

  const getOauth = () => {
    axios.get('https://www.strava.com/oauth/authorize')
  }

  return (
    <div className="mt-5 mb-5">
      <div className="container-flex chain-love mb-5">
        <div className="row title-text ml-5">
          Chain Love
        </div>
      </div>
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
        <NewPartForm currentBike={currentBike} updatePartFormView={updatePartFormView} popup={popup}/> :
        null
      }
      {progressModal ?
        <UnderConstructionModal popup={popup} /> :
        null
      }
      <button><a href="https://www.strava.com/oauth/authorize?client_id=42069&response_type=code&redirect_uri=http://localhost:7500/exchange_token&approval_prompt=force&scope=read">Strava Oauth</a></button>
    </div>

  );
}

 export default App;