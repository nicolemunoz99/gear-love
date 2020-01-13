import React from 'react';

const BikePanel = (props) => {

  console.log(props.bike)
  
  const showComponents = (e) => {
    props.handleBikeSelect(props.bike)
  }
  const showNewPartForm = (e) => {
    props.viewHandler('newPartForm')
  }

  return (
    <div className="col-3 border border-dark rounded m-3 p-2">
      <div className="photo-container">
        <div onClick={showComponents} className="h4 pointer">{props.bike.name}</div>
        <img onClick={showComponents} className="bike-photo pointer" src={props.bike.url}></img>
      </div>
      <div>Total Miles: {props.bike.distance}</div>
      <button onClick={showComponents} className="btn btn-outline-dark">View my components</button>
      {/* <button onClick={showNewPartForm} className="btn btn-outline-dark">Add a component to track</button> */}
    </div>
  );
}

export default BikePanel;