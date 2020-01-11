import React from 'react';

const BikeMain = (props) => {
  console.log(props.bike)
  
  // const addComponent (e) => {
  //   console.log()
  // }

  return (
    <div className='bike-container'>
      <img src=''></img>
      <div onClick={showComponents}>{props.bike.name}</div>
      <div>Total Miles: {props.bike.distance}</div>
      <button>Add a component to track</button>
    </div>
  );
}

export default BikeMain;