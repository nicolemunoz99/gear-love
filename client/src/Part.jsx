import React from 'react';
import axios from 'axios';

// TO DO: when retiring component, prompt user to add a replacement

const Part = (props) => {
  const deletePart = (e) => {
    props.handleDeletePart(props.part.part_id)
  }

  const resetMiles = (e) => {
    props.handleResetMiles(props.part.part_id)
  }

  let useageUntilEnd = props.part.lifespan_dist - (props.currentBike.distance - props.part.dist_when_added)


  let listedFeatures = ['part_type', 'part_brand', 'part_model', '']

  return (
    <div className="col-md-4 col-sm-6">
      {useageUntilEnd < 100 ? <div className="alert mb-1">I need to be replaced soon!</div> : null}
      <div className="part-panel border border-dark rounded mt-3 mb-3 p-2">
        <div className="mb-4"><span className="list-title">Type:</span> {props.part.type}</div>
        <div className="mb-4"><span className="list-title">Brand:</span> {props.part.brand}</div>
        <div className="mb-4"><span className="list-title">Model:</span> {props.part.model}</div>
        <div className="mb-4"><span className="list-title">Miles in use:</span> {props.currentBike.distance - props.part.dist_on_add}</div>
        <div className="mb-4"><span className="list-title">Miles until service/replacement:</span> {props.part.lifespan_dist - (props.currentBike.distance - props.part.dist_on_add)}</div>
        <div className="row">
          <div className="col-12">
            <button onClick={resetMiles} className="btn btn-secondary btn-sm mb-3 full-width">Serviced! Reset my mileage</button>
          </div>
          <div className="col-12"> 
            <button className="btn btn-secondary btn-sm mb-3 full-width" onClick={deletePart}>Retire me</button>
          </div>
        </div>
      </div>
    </div>)


}

export default Part;


