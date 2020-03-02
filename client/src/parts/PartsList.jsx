import React, { useEffect, useState } from 'react';
import Part from './Part.jsx'
import axios from 'axios';
import urls from '../../../urls.js'


const PartsList = (props) => {
  const [parts, updateParts] = useState([]);

  
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
    props.changeView('bikeList')
  };


  
  return (
    <div>
      <i onClick={returnToBikeList} className="display-4 pointer material-icons ml-4">
        arrow_back
      </i>
    <div className="container">      
     
      <div className="display-4">
        <span>Parts for "{props.currentBike.name}"</span>
        <i onClick={newPartHandler} className="display-4 ml-3 material-icons pointer">add_circle_outline</i>
      </div>
      <div className="row justify-content-center">
      
      { props.partsList.length > 0 ?
        props.partsList.map((part, i) => {
          return <Part key={part.part_id} handleDeletePart={handleDeletePart} handleResetMiles={handleResetMiles} currentBike={props.currentBike} part={part}/>
        }) 
        :
        <div className="col-12 my-3">
          Couldn't find any components for "{props.currentBike.name}"
        </div>
      }
    
    </div>
    </div>
    </div>
  );
}


export default PartsList;