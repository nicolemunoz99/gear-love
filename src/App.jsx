import React from 'react';
import axios from 'axios';
import BikesList from './BikesList.jsx';
import PartsList from './PartsList.jsx';
import NewPartForm from './NewPartForm.jsx'
import profileData from './sampleData/userProfile.js'; // eventually delete
import bikePhotos from './sampleData/bikePhotos.js'; // eventually delete


const App = (props) =>{
  const [userProfile, setProfile] = React.useState(profileData);
  const [currentBike, changeBike] = React.useState(null);
  const [partsList, changeParts] = React.useState(null);
  const [partFormModal, updatePartFormView] = React.useState(false)
  const [view, changeView] = React.useState('bikeList'); //bikeList, parts, newPartForm
  const api = 'http://127.0.0.1:7500/';

  // TO DO: make photo database

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
        <BikesList viewHandler={viewHandler} handleBikeSelect={handleBikeSelect} bikeList={userProfile.bikes} /> :
        null
      }
      {view === 'parts' || view === 'newPartForm' ?
        <PartsList viewHandler={viewHandler} refreshPartsList={handleBikeSelect} currentBike={currentBike} partsList={partsList} /> :
        null
      }
      {partFormModal === true ?
        <NewPartForm currentBike={currentBike} updatePartFormView={updatePartFormView}/> :
        null
      }
    </div>
  );
}

 export default App;