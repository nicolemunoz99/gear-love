import React from 'react';
import BikePanel from './BikePanel.jsx'


const BikesList = (props) => {
  

  return (
    <div className="container-sm">
      <div className="h2">Your Bikes</div>
      <div className="row justify-content-center mb-3">
      {
        props.bikeList.map( bike => {
            return <BikePanel viewHandler={props.viewHandler} handleBikeSelect={props.handleBikeSelect} key={bike.id} bike={bike}/>
        })
      }
      </div>
      {/* <div className="row justify-content-center">
        <button className="btn btn-outline-dark">Add a bike +</button>
      </div> */}
    </div>
  );
}

export default BikesList;