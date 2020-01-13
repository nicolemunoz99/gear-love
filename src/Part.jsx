import React from 'react';
import axios from 'axios';

const Part = (props) => {

  const deletePart = (e) => {
    props.handleDeletePart(props.part.part_id)
  }

  const resetMiles = (e) => {
    props.handleResetMiles(props.part.part_id)
  }


  return (
    <div className="col-3 border border-dark rounded m-3 p-2" key={props.part.part_id}>
      <div className="mb-2">Type: {props.part.part_type}</div>
      <div className="mb-2">Brand: {props.part.part_brand}</div>
      <div className="mb-2">Model: {props.part.part_model}</div>
      <div className="mb-2">Miles in use: {props.currentBike.distance - props.part.dist_when_added}</div>
      <div className="mb-2">Miles until service/replacement: {props.part.lifespan_dist - (props.currentBike.distance - props.part.dist_when_added)}</div>
      <button onClick={resetMiles} className="btn btn-secondary btn-sm mb-1">Serviced! Reset my mileage</button>
      <button className="btn btn-secondary btn-sm" onClick={deletePart}>Retire component</button>
    </div>)

  
}

export default Part;


