import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import PartTypeDropdownItem from './PartTypeDropdownItem.jsx';

import xDate from 'xdate'
import axios from 'axios';
import urls from '../../../urls.js';


const initFormVals = {
  type: '', custom_type: '', brand: '', model: '',
  lifespan_dist: '', lifespan_time: '',
  tracking_method: null, useage_metric: null,
  current_wear_method: '', current_wear_dist: '', current_wear_time: '', new_date: ''
};

const partList = ['Chain', 'Freehub', 'Suspension Fork', 'Cassette', '--- CUSTOM ---'];

const wearMethods = [
  {title: 'Calculate from Strava', id: 'strava'},
  {title: 'Estimate', id: 'estimate'},
  {title: 'New Part', id: 'new'}
];

const NewPartModal = (props) => {
  const [userInputs, updateInputs] = useState(initFormVals);
  const [errorList, updateErrors] = useState([]);

  console.log('props in NewPartModal', props)
  
  const updatePartHandler = (partType) => {
    let tempState = { ...initFormVals };
    tempState.type = partType;
    updateInputs(tempState);
  }

  const updateWearMethod = (e) => {
    let tempState = {...userInputs};
    tempState.current_wear_method = e.target.id;
    updateInputs(tempState);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    
    // validate form
    let errors = invalidFields(userInputs);
    if (errors.length > 0) {
      updateErrors(errors);
      return;
    }

    // TO DO: convert any distances from user's measurement preference to meters (strava's measurement unit)

    console.log('userInputs', userInputs)
    console.log('submit')

    // post and get updated part list
    let newPartList = (await axios.post(`${urls.api}/parts?bike_id=${props.currentBike.bike_id}`, userInputs)).data;
    if (newPartList.length > 0) {
      props.changeModal('postSuccess');
      props.changeParts(newPartList);
    }
  }

  const inputText = (e) => {
    if (e.target.value.length > 25) return;
    let tempState = { ...userInputs };
    tempState[e.target.id] = e.target.value;
    updateInputs(tempState);
  }

  const selectRadio = (e) => {
    let tempState = { ...userInputs };
    resetCustomInputs(tempState);
    tempState[e.target.name] = e.target.value;
    updateInputs(tempState);
  }

  return (
    <Modal width={8} title="Enter a new component" changeModal={props.changeModal}>

      <form>
        <div className="form-group row mb-2">
          <label className="col-sm-4 col-form-label">Basics: </label>
          <div className="col-sm-8">

            <div className="dropdown">
              <button className="btn btn-outline-dark dropdown-toggle full-width" type="button"
                id="partTypeDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {userInputs.type ? userInputs.type : 'Type'}
              </button>
              <div className="dropdown-menu full-width" aria-labelledby="dropdownMenuButton">
                {
                  partList.map(part => {
                    return (
                      <PartTypeDropdownItem key={part} updatePartHandler={updatePartHandler} part={part} />
                    )
                  })
                }
              </div>
            </div>
            {userInputs.type.toLowerCase().indexOf('custom') >= 0 ?
              <div className="form-group full-width mt-1">
                <input onChange={inputText} value={userInputs.custom_type} type="text" className="form-control"
                  id="custom_type" placeholder="Part type">
                </input>
              </div>
              : null
            }
          </div>
        </div>
        <div className="form-group row justify-content-end">
          <div className="col-sm-4 mb-2">
            <input onChange={inputText} value={userInputs.brand} type="text" className="form-control"
              id="brand" placeholder="Brand (optional)"></input>
          </div>
          <div className="col-sm-4">
            <input onChange={inputText} value={userInputs.model} type="text" className="form-control"
              id="model" placeholder="Model (optional)"></input>
          </div>
        </div>


        {userInputs.type ?
          <div className="form-group row mt-5 align-items-end" id="tracking-method-choice">
            <label className="col-sm-12 col-form-label">Default tracking or customize specification? </label>
            <div className="col-sm-4"></div>
            <div className="col-sm-8">

              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectRadio} type="radio" name="tracking_method" readOnly={true}
                  id="default-spec" value="default" className="custom-control-input"
                  checked={userInputs.tracking_method === 'default' ? true : false}
                  disabled={userInputs.type.toLowerCase().indexOf('custom') >= 0 ? true : false}>
                </input>
                <label className="custom-control-label" htmlFor="default-spec">Default</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectRadio} type="radio" name="tracking_method" readOnly={true}
                  id="custom-spec" value="custom" className="custom-control-input"
                  checked={userInputs.tracking_method === 'custom' ? true : false}>
                </input>
                <label className="custom-control-label" htmlFor="custom-spec">Custom</label>
              </div>
            </div>
          </div>
          :
          null
        }


        {userInputs.tracking_method === 'default' && userInputs.type ?
          <div>
            <div className="row my-5 justify-content-md-center">
              <div className="col-xs-auto">
                <p>
                  The default service/replacement interval for a <u>{userInputs.type}</u> is -TO DO-
                </p>
                <p>
                  "Default" tacking assumes this component is new. If you would like
                  to specify the current wear, select "custom" tracking above.
                </p>
              </div>
            </div>

          </div>
          : null
        }

        {userInputs.tracking_method === 'custom' ?
          <div>
            <div className="form-group row mt-5 align-items-end">
              <label className="col-sm-4 col-form-label">Usage metric: </label>
              <div className="col-sm-8">

                <div className="custom-control custom-radio custom-control-inline">
                  <input onClick={selectRadio} type="radio"
                    id="distance" value="distance" name="useage_metric" className="custom-control-input">
                  </input>
                  <label className="custom-control-label" htmlFor="distance">Distance</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                  <input onClick={selectRadio} type="radio"
                    id="hours" value="hours" name="useage_metric" className="custom-control-input">
                  </input>
                  <label className="custom-control-label" htmlFor="hours">Hours</label>
                </div>

              </div>
            </div>

            {userInputs.useage_metric ?
              <div>






                <div className="form-group row mb-2">
                  <label className="col-sm-4 col-form-label">Current wear: </label>
                  <div className="col-sm-8">

                    <div className="dropdown">
                      <button className="btn btn-outline-dark dropdown-toggle full-width" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {userInputs.current_wear_method ? userInputs.current_wear_method : 'Select'}
                      </button>
                      <div className="dropdown-menu full-width" aria-labelledby="dropdownMenuButton">
                        {
                          wearMethods.map(method => {
                            return (
                              <a onClick={updateWearMethod} id={method.id} className="dropdown-item pointer" >{method.title}</a>
                            )
                          })
                        }
                      </div>
                    </div>

                    {userInputs.current_wear_method === 'estimate' ?
                      

                      <div className="form-group full-width mt-1">
                        <input 
                          onChange={inputText} 
                          type="number" className="form-control"
                          value={userInputs.useage_metric === 'distance' ? userInputs.current_wear_dist : userInputs.current_wear_time} 
                          id={userInputs.useage_metric === 'distance' ? 'current_wear_dist' : 'current_wear_time'} 
                          placeholder={`Estimate current wear in ${userInputs.useage_metric === 'distance' ? props.distUnits : 'hours'}`}>
                        </input>
                        Your best guess for the current wear of this component in terms of the metric you selected above.
                      </div>
                      
                      
                      : null
                    }

                    {userInputs.current_wear_method === 'strava' ?
                    <div>
                      <div className="form-group full-width mt-1">
                        <input 
                          onChange={inputText} 
                          type="date" className="form-control"
                          value={userInputs.new_date} 
                          id='new_date' 
                          placeholder="Date (MM/DD/YY)">
                        </input>
                      </div>
                      When was this part new/last serviced? This component's useage as of now will be calculated from your Strava activities 
                      and assuming the component was new on the date you enter above. Your first activity will be 
                      used if the date you enter precedes your first Strava activity.
                    </div>
                    :
                    null
                    }

                    {userInputs.current_wear_method === 'new' ?
                    <div>
                      Distance/time will be calculated starting with your next activity.
                    </div>
                    :
                    null
                    }


                  </div>
                </div>





                <div className="form-group row mt-5 align-items-end">
                  <label className="col-sm-12 col-form-label" >
                    Lifespan/service interval in terms of {userInputs.useage_metric.toUpperCase()} {userInputs.useage_metric === 'distance' ? `(${props.measurementPref})` : null}:
                  </label>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8">
                    <input onChange={inputText} type="number" className="form-control"
                      id={userInputs.useage_metric === 'distance' ? 'lifespan_dist' : 'lifespan_time'}
                      value={userInputs.useage_metric === 'distance' ? userInputs.lifespan_dist : userInputs.lifespan_time}>
                    </input>
                  </div>
                </div>

                {errorList.length > 0 ?
                  <div className="row my-5 justify-content-center">
                    <div className="col-xs-auto error-text">
                      <div>
                        Please enter a valid value
                    <ul>
                          {errorList.map(error => {
                            return (
                              <li>{error}</li>
                            )
                          }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  :
                  null
                }


              </div>
              : null
            }

          </div>
          : null
        }

        {userInputs.useage_metric || (userInputs.tracking_method === 'default' && userInputs.type) ?
          <div className="row justify-content-center mt-4">
            <button onClick={submitForm} className="btn btn-outline-dark full-width">Submit</button>
          </div>
          :
          null
        }

      </form>

    </Modal >

  )
}

export default NewPartModal;

const resetCustomInputs = (inputs) => {
  inputs.useage_metric = '';
  inputs.lifespan_dist = '';
  inputs.lifespan_time = '';
  inputs.current_wear_method;
  inputs.current_wear_time = '';
  inputs.current_wear_dist = ''
}

const invalidFields = (userInputs) => {
  let tempErrorList = [];

  if (!userInputs.tracking_method) tempErrorList.push('tracking method');
  if (!userInputs.type) tempErrorList.push('part type');

  if (userInputs.tracking_method === 'custom') {
    if (!userInputs.useage_metric) tempErrorList.push('usage metric');
    
    if ( userInputs.current_wear_method === "estimate" ) {
      if ( 
        (userInputs.current_wear_dist.length === 0 && userInputs.current_wear_time.length === 0) ||
        Number(userInputs.current_wear_dist) < 0 || Number(userInputs.current_wear_time) < 0
      )
        { tempErrorList.push('current wear'); }
    };

    if (userInputs.current_wear_method === 'strava') {
      let native_new_date = xDate(userInputs.new_date);
      // date must be before today's date
      // date must be after 1970
      if (!userInputs.new_date || (native_new_date - Date.now()) > 0 || (native_new_date - xDate(1970)) < 0 ) {
        tempErrorList.push('current wear')
      }
      
    }

    if ( !(Number(userInputs.lifespan_dist) > 0) && !(Number(userInputs.lifespan_time) > 0)) {
      tempErrorList.push('life/service interval')
    };
  }
  
  return tempErrorList;
}