import React, { useState, useEffect } from 'react';

const NewPartForm = (props) => {
  const [useageMetric, updateUseageMetric] = useState('distance');
  const [trackingMethod, updatetrackingMethod] = useState(null);
  const [userInputs, updateInputs] = useState({
    type: null, brand: null, model: null,
    dist_on_add: null, time_on_add: null,
    lifespan_dist: null, lifespan_time: null
  });

  const [showCustomSection, updateShowCustomSection] = useState(false);
  const [showDefaultInfo, updateShowDefaultInfo] = useState(false);

  const hideNewPartForm = (e) => {
    if (e.target.className.includes('modal-backdrop') || e.target.className.includes('close-me')) {
      props.updatePartFormView(false);
    }
  };
  // const inProgress = (e) => {
  //   e.preventDefault();
  //   props.popup(true);
  // };

  const inputText = (e) => {
    console.log(e.target.value);
    let tempState = JSON.parse(JSON.stringify(textInputs));
    tempState[e.target.id] = e.target.value;
    updateInputs(tempState);
  }

  const submitForm = (e) => {

  }

  const selectUseageMetric = (e) => {
    updateUseageMetric(e.target.value)
  }
  const selectTracking = (e) => {
    updatetrackingMethod(e.target.value)
  }
  const noPointerEvents = () => { };

  return (
    <div onClick={hideNewPartForm} className="d-flex justify-content-center modal-backdrop">

      <div className='newPartForm p-5 border rounded'>

        <form onClick={noPointerEvents}>
          <div className="h2 mb-5">Enter a new component</div>
          <div className="close-me h3" onClick={hideNewPartForm}>X</div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Basics: </label>
            <div className="col-sm-8">
              <input onChange={inputText} type="email" className="form-control" id="type" placeholder="Type"></input>
            </div>
          </div>
          <div className="form-group row justify-content-end">
            <div className="col-sm-4">
              <input type="email" className="form-control" id="brand" placeholder="Brand"></input>
            </div>
            <div className="col-sm-4">
              <input type="email" className="form-control" id="model" placeholder="Model"></input>
            </div>
          </div>



          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label">Use default setting for tracking useage of this part or use customize specification? </label>
            <div className="col-sm-8">

              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectTracking} type="radio" id="custom" value="custom" name="customRadioInline1" className="custom-control-input"></input>
                <label className="custom-control-label" for="custom">Custom</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectTracking} type="radio" id="default-yes" value="default" name="customRadioInline1" className="custom-control-input"></input>
                <label className="custom-control-label" for="default-yes">Default</label>
              </div>
            </div>
          </div>
          {trackingMethod === 'default' ?
            <div>
              <div className="row my-5 justify-content-md-center">
                <div className="col-xs-auto strong-text">You will receive a notice to service/replace this part in **TO DO**</div>
              </div>
              <div className="row justify-content-center">
                <button onClick={submitForm} className="btn btn-outline-dark">Submit</button>
              </div>
            </div>
            : null
          }
          { trackingMethod === 'custom' ?
            <div>
              <div className="form-group row mt-5 align-items-end">
                <label className="col-sm-4 col-form-label">Receive notifcation based on: </label>
                <div className="col-sm-8">

                  <div className="custom-control custom-radio custom-control-inline">
                    <input onClick={selectUseageMetric} type="radio" id="distance" value="distance" name="customRadioInline1" className="custom-control-input"></input>
                    <label className="custom-control-label" for="distance">Distance</label>
                  </div>

                  <div className="custom-control custom-radio custom-control-inline">
                    <input onClick={selectUseageMetric} type="radio" id="hours" value="hours" name="customRadioInline1" className="custom-control-input"></input>
                    <label className="custom-control-label" for="hours">Hours</label>
                  </div>

                </div>
              </div>

              <div className="form-group row mt-5 align-items-end">
                <label className="col-sm-4 col-form-label">{`Estimated ${useageMetric} to-date on this component?`} </label>
                <div className="col-sm-8">
                  <input type="email" className="form-control" id="current-wear" placeholder="(to do: units)"></input>
                </div>
              </div>

              <div className="form-group row mt-5 align-items-end">
                <label className="col-sm-4 col-form-label" >Enter lifespan in terms of {useageMetric}: </label>
                <div className="col-sm-8">
                  <input type="email" className="form-control" id="lifespan" placeholder="(to do: units)"></input>
                </div>
              </div>

              <div className="row my-5 justify-content-md-center">
                <div className="col-xs-auto strong-text">You will receive a notice to service/replace this part in **TO DO**</div>
              </div>

              <div className="row justify-content-center">
                <button onClick={submitForm} className="btn btn-outline-dark">Submit</button>
              </div>
            </div>
            : null
          }

        </form>

      </div>

    </div >

  )
}

export default NewPartForm