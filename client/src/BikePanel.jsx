import React from 'react';
import { distConvert, timeConvert } from './unitConvert.js';

const BikePanel = (props) => {

  const showComponents = (e) => {
    props.handleBikeSelect(props.bike)
    props.viewHandler('parts')
  };

  const showDetails = (e) => {

  };

  const itemClass = "mt-2 mb-2"


  return (
    <div className="col-md-3 border border-dark rounded shadow m-2 bike-card">


        <div onClick={showComponents} className="card-polygon pointer">
        </div>
        <div className="gear-photo-wrapper">
          <img onClick={showComponents} className="bike-photo pointer" src={props.bike.url ? props.bike.url : 'photos/bike-default2.png'}></img>
        </div>


      <div className="row gear-details align-items-end">
        <div className="col">
        <div onClick={showComponents} className="h4 pointer">{props.bike.name}</div>

        <div className={itemClass}>
          {`Total ${props.distUnits}:  ${distConvert(props.distUnits, props.bike.dist_current)}`}
        </div>
        
        <div className={itemClass}>
          {`Total hours:  ${timeConvert(props.bike.time_current)}`}
        </div>

        <div onClick={showDetails} className="pointer text-center">
          <i class="material-icons"> keyboard_arrow_down </i>
        </div>
        {/* <button onClick={showComponents} className="btn btn-secondary btn-sm mb-2">
          View my components
        </button> */}
        </div>
      </div>



      {/* <div className={itemClass}>
        {props.bike.brand_name ? `Brand: ${props.bike.brand_name}` : null}
      </div>
      <div className={itemClass}>
        {props.bike.model_name ? `Model: ${props.bike.model_name}` : null}
      </div>
      <div className={itemClass}>
        {props.bike.description ? `Description: ${props.bike.description}` : null}
      </div>
      
      <div className={itemClass}>
        Details
      </div>
      <div className={itemClass}>
        Notes:
      </div> */}

      
    </div>
  );
}

export default BikePanel;