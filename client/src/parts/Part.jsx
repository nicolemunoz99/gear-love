import React from 'react';
import PartNav from './PartNav.jsx';

// TO DO: when retiring component, prompt user to add a replacement

const Part = (props) => {
  
  const retire = (e) => {
    props.handleDeletePart(props.part.part_id)
  }

  const resetTracking = (e) => {
    props.handleResetMiles(props.part.part_id)
  }

  let useageUntilEnd = props.part.lifespan_dist - (props.currentBike.distance - props.part.dist_when_added)


  return (
    <div className="col-xs-12 col-md-6">
      {useageUntilEnd < 100 ? <div className="alert mb-1">I need to be replaced soon!</div> : null}
      <div className="part-panel border border-dark rounded my-3 p-2">
        <PartNav 
          retire={retire}
          resetTracking={resetTracking}
          partId={props.part.part_id} />
        <div className="mb-3 part-title">{props.part.type}</div>
        <div className="mb-4"><span className="list-title">Brand:</span> {props.part.brand}</div>
        <div className="mb-4"><span className="list-title">Model:</span> {props.part.model}</div>
        <div className="mb-4"><span className="list-title">Miles in use:</span> {props.currentBike.distance - props.part.dist_on_add}</div>
        <div className="mb-4"><span className="list-title">Miles until service/replacement:</span> {props.part.lifespan_dist - (props.currentBike.distance - props.part.dist_on_add)}</div>
      </div>
    </div>)


}

export default Part;


