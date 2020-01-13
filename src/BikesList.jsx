import React from 'react';
import BikePanel from './BikePanel.jsx'


const BikesList = (props) => {


  return (
    <div className="container-sm">
      <div className="h2">Your Bikes</div>
      <div className="row">
      {
        props.bikeList.map( bike => {
            return <BikePanel viewHandler={props.viewHandler} handleBikeSelect={props.handleBikeSelect} key={bike.id} bike={bike}/>
        })
      }
      </div>
      <button className="btn btn-outline-dark">Add a bike +</button>
    </div>
  );
}

export default BikesList;