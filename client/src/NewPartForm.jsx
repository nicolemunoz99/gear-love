import React, { useState } from 'react';

const NewPartForm = (props) => {
  const [usageMetric, updateUseageMetric] = useState(null);
  const [trackingMethod, updatetrackingMethod] = useState(null);

  const hideNewPartForm = (e) => {
    if (e.target.className.includes('modal-backdrop') || e.target.className.includes('close-me')) {
      props.updatePartFormView(false);
    }
  };
  const inProgress = (e) => {
    e.preventDefault();
    props.popup(true);
  };

  const selectUsageMetric = (e) => {
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
              <input type="email" className="form-control" id="part-type" placeholder="Type"></input>
            </div>
          </div>
          <div className="form-group row justify-content-end">
            <div className="col-sm-4">
              <input type="email" className="form-control" id="part-type" placeholder="Brand"></input>
            </div>
            <div className="col-sm-4">
              <input type="email" className="form-control" id="part-type" placeholder="Model"></input>
            </div>
          </div>
          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label">Use default setting for tracking usage of this part or specify custom metrics? </label>
            <div className="col-sm-8">
              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectTracking} type="radio" id="default-yes" value="default" name="customRadioInline1" className="custom-control-input"></input>
                <label className="custom-control-label" for="default-yes">Default</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectTracking} type="radio" id="custom" value="custom" name="customRadioInline1" className="custom-control-input"></input>
                <label className="custom-control-label" for="custom">Custom</label>
              </div>
            </div>
          </div>
          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label" >Receive notifcation based on: </label>
            <div className="col-sm-8">
              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectUsageMetric} type="radio" id="distance" value="distance" name="customRadioInline1" className="custom-control-input"></input>
                <label className="custom-control-label" for="distance">Distance</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input onClick={selectUsageMetric} type="radio" id="hours" value="hours" name="customRadioInline1" className="custom-control-input"></input>
                <label className="custom-control-label" for="hours">Hours</label>
              </div>
            </div>
          </div>
          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label">Estimated distance on this component? </label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="current-distance-wear" placeholder="(to do: units)"></input>
            </div>
          </div>
          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label">Estimated time on this component? </label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="current-time-wear" placeholder="(to do: units)"></input>
            </div>
          </div>

          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label" >Enter lifespan in {usageMetric}: </label>
          </div>
          <div className="row justify-content-center">
            <button onClick={inProgress} className="btn btn-outline-dark">Submit Component</button>
          </div>

        </form>

      </div>

    </div >

  )
}

export default NewPartForm