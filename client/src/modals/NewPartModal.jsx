import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import PartTypeDropdownItem from './PartTypeDropdownItem.jsx';
import axios from 'axios';
import urls from '../../../urls.js';

const tempBikeId = "b75929";

const initFormVals = {
  type: '', custom_type: '', brand: '', model: '',
  dist_on_add: '', time_on_add: '',
  lifespan_dist: '', lifespan_time: '',
  tracking_method: null, useage_metric: null
};

const partList = ['Chain', 'Freehub', 'Suspension Fork', 'Cassette', '--- CUSTOM ---'];

const NewPartModal = (props) => {
  const [userInputs, updateInputs] = useState(initFormVals);
  const [errorList, updateErrors] = useState([]);


  const updatePartHandler = (partType) => {
    let tempState = {...initFormVals};
    tempState.type = partType;
    updateInputs(tempState);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    console.log('submit')
    let tempErrorList = [];
    
    if (!userInputs.tracking_method) tempErrorList.push('tracking method');
    if (!userInputs.type) tempErrorList.push('part type');

    if (userInputs.tracking_method === 'custom') {
      if (!userInputs.useage_metric) tempErrorList.push('useage metric');
      if ((!userInputs.dist_on_add && !userInputs.time_on_add) || 
            Number(userInputs.dist_on_add) < 0 || Number(userInputs.time_on_add) < 0) {
        tempErrorList.push('current wear')
      };
      if ((!userInputs.lifespan_dist && !userInputs.lifespan_time) || 
            Number(userInputs.lifespan_dist) < 0 || Number(userInputs.lifespan_time) < 0) {
        tempErrorList.push('life/service interval')
      };
    }

    if (tempErrorList.length > 0) {
      updateErrors(tempErrorList);
      return;
    }

    let postStatus = (await axios.post(`${urls.api}/parts?newPart=true&bike_id=${props.bikeId ? props.bikeId : tempBikeId}`, userInputs)).status;
    if (postStatus === 200) {
      props.changeModal('postSuccess');
    }
  }

  const inputText = (e) => {
    if (e.target.value.length > 15) return;
    let tempState = {...userInputs};
    tempState[e.target.id] = e.target.value;
    updateInputs(tempState);
  }

  const selectRadio = (e) => {
    let tempState = {...userInputs};
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


        {userInputs.tracking_method === 'default' && userInputs.type?
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
              <label className="col-sm-4 col-form-label">Useage metric: </label>
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

                <div className="form-group row mt-5 align-items-end">

                  <label className="col-sm-12 col-form-label">
                    <div>
                      Estimate current wear on this component.
                    </div>
                    <div>
                      {userInputs.useage_metric.toUpperCase()} {userInputs.useage_metric === 'distance' ? `(${props.distUnits}) ` : null}
                      to date?
                    </div>
                  </label>

                  <div className="col-sm-4"></div>
                  <div className="col-sm-8">
                    <input onChange={inputText} type="number" className="form-control"
                      id={userInputs.useage_metric === 'distance' ? 'dist_on_add' : 'time_on_add'}
                      value={userInputs.useage_metric === 'distance' ? userInputs.dist_on_add : userInputs.time_on_add}>
                    </input>
                  </div>

                </div>




                <div className="form-group row mt-5 align-items-end">
                  <label className="col-sm-12 col-form-label" >
                    Lifespan in terms of {userInputs.useage_metric.toUpperCase()} {userInputs.useage_metric === 'distance' ? `(${props.distUnits})` : null}:
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
                      )}
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
  inputs.dist_on_add = '';
  inputs.time_on_add = '';
  inputs.lifespan_dist = '';
  inputs.lifespan_time = '';
}