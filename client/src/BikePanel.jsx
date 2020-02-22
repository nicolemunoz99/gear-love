import React from 'react';

const BikePanel = (props) => {

  
  const showComponents = (e) => {
    props.handleBikeSelect(props.bike)
  }


  return (
    <div className="col-md-3 border border-dark rounded shadow m-2 p-2">
      <div className="photo-container">
        <div onClick={showComponents} className="h4 pointer">{props.bike.name}</div>
        <img onClick={showComponents} className="bike-photo pointer" src={props.bike.url}></img>
      </div>
      <div className="mt-2 mb-2">Total Miles: {props.bike.distance}</div>
      <button onClick={showComponents} className="btn btn-secondary btn-sm mb-2">View my components</button>
    </div>
  );
}

export default BikePanel;