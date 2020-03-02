import React from 'react';
import BikePanel from './BikePanel.jsx'


const BikesList = (props) => {
  

  return (
    <div className="container-md my-5">
      <div className="display-4">Your Bikes</div>
      <div className="row no-gutters justify-content-center mb-3">
      {
        props.bikes.map( bike => {
            return <BikePanel changeView={props.changeView} 
                              handleBikeSelect={props.handleBikeSelect} 
                              key={bike.bike_id}
                              bike={bike}
                              distUnits={props.distUnits}/>
        })
      }
      </div>
      
    </div>
  );
}

export default BikesList;