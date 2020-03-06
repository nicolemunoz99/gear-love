import React, { useState } from 'react';

const BikePanel = (props) => {
  const [showDetails, updateShowDetails] = useState(false)

  const showComponents = (e) => {
    props.handleBikeSelect(props.bike);
    props.changeView('parts');
  };

  const toggleDetails = (e) => {
    updateShowDetails(!showDetails);
  };

  const itemClass = "mt-2 mb-2"


  return (

    <div className="col-md-6 col-xl-4 p-2">
      <div className="bike-card full-width border border-dark rounded shadow">

        <div onClick={showComponents} className="card-polygon pointer">
        </div>
        <div className="gear-photo-wrapper">
          <img onClick={showComponents} className="pointer" src={props.bike.url ? props.bike.url : 'photos/bike-default2.png'}></img>
        </div>

        <div className="bike-card-filler">   
        </div>

        <div className="row gear-details align-items-end">
          <div className="col">
            <div onClick={showComponents} className="h4 pointer">{props.bike.name}</div>

            <div className={itemClass}>
              {`Total ${props.measurementPref}:  ${props.bike.dist_current}`}
            </div>

            <div className={itemClass}>
              {`Total hours:  ${props.bike.time_current}`}
            </div>

            {showDetails ?
            <div>
            <div className={itemClass}>
              {props.bike.brand_name ? `Brand: ${props.bike.brand_name}` : null}
            </div>
            <div className={itemClass}>
              {props.bike.model_name ? `Model: ${props.bike.model_name}` : null}
            </div>
            <div className={itemClass}>
              {props.bike.description ? `Description: ${props.bike.description}` : null}
            </div>

            <div className={itemClass}>
              {props.bike.details ? `Details: ${props.bike.details}` : null}
            </div>
            <div className={itemClass}>
              Notes:
            </div>
            </div>
            :
            null
            }


            {/* <div onClick={toggleDetails} className="pointer text-center">
              {showDetails ?
                <i className="material-icons"> arrow_drop_up </i>
                :
                <i className="material-icons">arrow_drop_down</i>
              }
            </div> */}

            <div onClick={toggleDetails} className="pointer text-center">
              {showDetails ?
                <i className="material-icons"> expand_less </i>
                :
                <i className="material-icons">expand_more</i>
              }
            </div>

            {/* <button onClick={showComponents} className="btn btn-secondary btn-sm mb-2">
          View my components
        </button> */}
          </div>

        </div>

      </div>
    </div>
  );
}

export default BikePanel;