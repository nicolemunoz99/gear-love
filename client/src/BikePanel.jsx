import React from 'react';
import {distConvert, timeConvert} from './unitConvert.js';

const BikePanel = (props) => {
  console.log('props', props)
  
  const showComponents = (e) => {
    props.handleBikeSelect(props.bike)
    props.viewHandler('parts')
  }


  return (
    <div className="col-md-3 border border-dark rounded shadow m-2 p-2">
      <div className="photo-container">
        <div onClick={showComponents} className="h4 pointer">{props.bike.name}</div>
        <img onClick={showComponents} className="bike-photo pointer" src={props.bike.url}></img>
      </div>
      <div className="mt-2 mb-2">
        {props.bike.brand_name ? `Brand: ${props.bike.brand_name}` : null}
      </div>
      <div className="mt-2 mb-2">
        {props.bike.model_name ? `Model: ${props.bike.model_name}` : null}
      </div>
      <div className="mt-2 mb-2">
        {props.bike.description ? `Description: ${props.bike.description}` : null}
      </div>
      <div className="mt-2 mb-2">
        {`Total ${props.distUnits}:  ${distConvert(props.distUnits, props.bike.dist_current)}`}
      </div>
      <div className="mt-2 mb-2">
        {`Total hours:  ${timeConvert(props.bike.time_current)}`}
      </div>

      <button onClick={showComponents} className="btn btn-secondary btn-sm mb-2">
        View my components
      </button>
    </div>
  );
}

export default BikePanel;