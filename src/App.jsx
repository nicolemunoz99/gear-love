import React from 'react';
import GearList from './GearList.jsx';
import profileData from './sampleData/userProfile.js';

const App = (props) =>{
  const [userProfile, setProfile] = React.useState(profileData);
  console.log('profile', profileData)



  return (
    <div>
      <GearList bikeList={userProfile.bikes}/>
    </div>
  );

}


  export default App;