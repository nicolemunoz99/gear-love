import React from 'react';
import BikePanel from './BikePanel.jsx'


const BikesList = (props) => {
  

  return (
    <div className="container-md">
      <div className="h2">Your Bikes</div>
      <div className="row no-gutters justify-content-center mb-3">
      {
        props.bikes.map( bike => {
            return <BikePanel viewHandler={props.viewHandler} 
                              handleBikeSelect={props.handleBikeSelect} 
                              key={bike.id}
                              bike={bike}
                              distUnits={props.distUnits}/>
        })
      }
      </div>
      
    </div>
  );
}

export default BikesList;