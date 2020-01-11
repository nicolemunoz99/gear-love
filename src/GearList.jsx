import React from 'react';
import Bike from './Bike.jsx'

const GearList = (props) => {
  
  
  return (
    <div>
      My Bikes
      {
        props.bikeList.map((bike, i)=> {
            return <Bike key={bike.id} bike={bike}/>
        })
      }
    </div>
  );
}

export default GearList