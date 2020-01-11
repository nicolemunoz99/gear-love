import React from 'react';
import BikeMain from './BikeMain.jsx'

const GearList = (props) => {
  
  
  return (
    <div>
      My Bikes
      {
        props.bikeList.map((bike, i)=> {
            return <BikeMain key={bike.id} bike={bike}/>
        })
      }
    </div>
  );
}

export default GearList