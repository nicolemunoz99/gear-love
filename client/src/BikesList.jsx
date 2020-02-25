import React from 'react';
import BikePanel from './BikePanel.jsx'


const BikesList = (props) => {
  

  return (
    <div className="container-sm">
      <div className="h2">Your Bikes</div>
      <div className="row justify-content-center mb-3">
      {
        props.userProfile.bikes.map( bike => {
            return <BikePanel viewHandler={props.viewHandler} 
                              handleBikeSelect={props.handleBikeSelect} 
                              key={bike.id}
                              bike={bike}/>
        })
      }
      </div>
      
    </div>
  );
}

export default BikesList;