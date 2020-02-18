import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import PartTypeDropdownItem from './PartTypeDropdownItem.jsx';

const initFormVals = {
  type: '', custom_type: '', brand: '', model: '',
  dist_on_add: null, time_on_add: null,
  lifespan_dist: null, lifespan_time: null,
  tracking_method: null, useage_metric: null
}

const NewPartModal = (props) => {
  const [partList, updateNA] = useState(['Chain', 'Freehub', 'Suspension Fork', 'Cassette', '--- CUSTOM ---'])
  const [userInputs, updateInputs] = useState(initFormVals);
  const [showCustomSection, updateShowCustomSection] = useState(false);
  const [showDefaultInfo, updateShowDefaultInfo] = useState(false);

  const updatePartHandler = (partType) => {
    console.log('this is here')
    let tempState = JSON.parse(JSON.stringify(initFormVals))
    tempState["type"] = partType;
    updateInputs(tempState);
  }

  const inputText = (e) => {
    let tempState = JSON.parse(JSON.stringify(userInputs));
    tempState[e.target.id] = e.target.value;
    updateInputs(tempState);
  }

  const submitForm = (e) => {

  }

  const selectTracking = (e) => {
    let tempState = JSON.parse(JSON.stringify(userInputs));
    tempState['tracking_method'] = e.target.value;
    updateInputs(tempState);
    let nextElement = document.getElementById('tracking-method-choice').nextSibling
    nextElement.scrollIntoView();
  }

  const selectUseageMetric = (e) => {
    let tempState = JSON.parse(JSON.stringify(userInputs));
    tempState['useage_metric'] = e.target.value;
    updateInputs(tempState);
  }


  const noPointerEvents = () => { };

  return (
    <Modal changeModal={props.changeModal}>

      <form onClick={noPointerEvents}>
        <div className="h2 mb-5">Enter a new component</div>
        <div className="form-group row mb-2">
          <label className="col-sm-4 col-form-label">Basics: </label>
          <div className="col-sm-8">

            <div className="dropdown">
              <button className="btn btn-outline-dark dropdown-toggle full-width" type="button" id="partTypeDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {userInputs.type ? userInputs.type : 'Type'}
              </button>
              <div className="dropdown-menu full-width" aria-labelledby="dropdownMenuButton">
                {
                  partList.map(part => {
                    return (
                      <PartTypeDropdownItem updatePartHandler={updatePartHandler} part={part} />
                    )
                  })
                }
              </div>
            </div>
            {userInputs.type.toLowerCase().indexOf('custom') >= 0 ?
            <div className="form-group full-width mt-1">
              <input onChange={inputText} value={userInputs.custom_type} type="text" className="form-control" id="custom_type" placeholder="Part type"></input>
            </div>
            : null
            }
          </div>
        </div>
        <div className="form-group row justify-content-end">
          <div className="col-sm-4 mb-2">
            <input onChange={inputText} value={userInputs.brand} type="text" className="form-control" id="brand" placeholder="Brand (optional)"></input>
          </div>
          <div className="col-sm-4">
            <input onChange={inputText} value={userInputs.model} type="text" className="form-control" id="model" placeholder="Model (optional)"></input>
          </div>
        </div>



        <div className="form-group row mt-5 align-items-end" id="tracking-method-choice">
          <label className="col-sm-4 col-form-label">Default tracking or customize specification? </label>
          <div className="col-sm-8">

            <div className="custom-control custom-radio custom-control-inline">
              <input onClick={selectTracking} type="radio" id="custom" value="custom" name="customRadioInline1" className="custom-control-input"
                checked={userInputs.tracking_method === 'custom' ? true : false}>
              </input>
              <label className="custom-control-label" for="custom">Custom</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input onClick={selectTracking} type="radio" id="default-spec" value="default" name="customRadioInline1" className="custom-control-input"
                checked={userInputs.tracking_method === 'default' ? true : false}
                disabled={userInputs.type.toLowerCase().indexOf('custom') >= 0 ? true : false}>
              </input>
              <label className="custom-control-label" for="default-spec">Default</label>
            </div>
          </div>
        </div>

        {userInputs.tracking_method === 'default' ?
          <div>
            <div className="row my-5 justify-content-md-center">
              <div className="col-xs-auto strong-text">You will receive a notice to service (or replace) this part in **TO DO**</div>
            </div>
            <div className="row justify-content-center">
              <button onClick={submitForm} className="btn btn-outline-dark">Submit</button>
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
                  <input onClick={selectUseageMetric} type="radio" id="distance" value="distance" name="customRadioInline2" className="custom-control-input"></input>
                  <label className="custom-control-label" for="distance">Distance</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                  <input onClick={selectUseageMetric} type="radio" id="hours" value="hours" name="customRadioInline2" className="custom-control-input"></input>
                  <label className="custom-control-label" for="hours">Hours</label>
                </div>

              </div>
            </div>

            {userInputs.useage_metric ?
              <div>
                <div className="form-group row mt-5 align-items-end">
                  <label className="col-sm-4 col-form-label">Estimated <u>{userInputs.useage_metric}</u> to-date? </label>
                  <div className="col-sm-8">
                    <input type="email" className="form-control" id="current-wear" placeholder="(to do: units)"></input>
                  </div>
                </div>

                <div className="form-group row mt-5 align-items-end">
                  <label className="col-sm-4 col-form-label" >Enter lifespan in terms of <u>{userInputs.useage_metric}</u>: </label>
                  <div className="col-sm-8">
                    <input type="email" className="form-control" id="lifespan" placeholder="(to do: units)"></input>
                  </div>
                </div>

                <div className="row my-5 justify-content-md-center">
                  <div className="col-xs-auto strong-text">You will receive a notice to service (or replace) this part in **TO DO**</div>
                </div>

                <div className="row justify-content-center">
                  <button onClick={submitForm} className="btn btn-outline-dark">Submit</button>
                </div>
              </div>
              : null
            }

          </div>
          : null
        }

      </form>

    </Modal>

  )
}

export default NewPartModal