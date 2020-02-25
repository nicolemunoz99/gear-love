import React, { useEffect } from 'react';
import Part from './Part.jsx'
import axios from 'axios';
import urls from '../../urls.js'


const PartsList = (props) => {
  const [parts, updateParts] = React.useState([]);

  
  useEffect(
    () => {
      updateParts(props.parts)
    },
    [props.partsList]
  );

  const handleDeletePart = (partId) => {
    axios.delete(`${urls.api}/parts/${partId}`)
      .then(() => {
        props.refreshPartsList(props.currentBike);
      })
  };

  const handleResetMiles = (partId) => {
    axios.put(`${api}/parts/${partId}?dist_when_added=${props.currentBike.distance}`) // update part mileage to current distance
      .then((data) => {
        props.refreshPartsList(props.currentBike);
      })

  };
  
  const newPartHandler = () => {
    props.changeModal('newPart');
  };

  const returnToBikeList = () => {
    props.viewHandler('bikeList')
  };


  
  return (
    <div className="container">
      <div className="h2">Parts for "{props.currentBike.name}"</div>
      <button onClick={newPartHandler} className="btn btn-outline-dark">New Component +</button>
      <div className="row justify-content-center">
      
      { props.partsList.length > 0 ?
        props.partsList.map((part, i) => {
          return <Part key={part.part_id} handleDeletePart={handleDeletePart} handleResetMiles={handleResetMiles} currentBike={props.currentBike} part={part}/>
        }) :
        <div className="col-12 mt-3 mb-3">
          Couldn't find any components for "{props.currentBike.name}"
        </div>
      }
    
    </div>
    <button className="btn btn-outline-dark" onClick={returnToBikeList}>Back to your bikes</button> 
    </div>
  );
}


export default PartsList;