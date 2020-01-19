import React, { useState } from 'react';
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
    fetch(`${api}${bikeInfo.id}/parts`)
      .then(response => response.json())
      .then(partsData => {
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
    </div>

  );
}

 export default App;