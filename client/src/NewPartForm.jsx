import React from 'react';

const NewPartForm = (props) => {

  const hideNewPartForm = (e) => {
    if (e.target.className.includes('modal-backdrop') || e.target.className.includes('close-me')) {
      props.updatePartFormView(false);
    }
  };
  const inProgress = (e) => {
    e.preventDefault();
    props.popup(true);
  };

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
            <label className="col-sm-4 col-form-label">Estimated distance on this component? </label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="current-wear" placeholder="(to do: units)"></input>
            </div>
          </div>
          <div className="form-group row mt-5 align-items-end">
            <label className="col-sm-4 col-form-label">Estimated time on this component? </label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="current-wear" placeholder="(to do: units)"></input>
            </div>
          </div>
          <div class="form-group row mt-5 align-items-end">
            <label class="col-sm-4 col-form-label" >Receive notifcation based on: </label>
            <div className="col-sm-4">
              <input type="checkbox" id="inlineCheckbox1" value="option1"></input>
              <label className="ml-2">Hours</label>
            </div>
            <div className="col-sm-4">
              <input type="checkbox" id="inlineCheckbox1" value="option1"></input>
              <label className="ml-2">Distance</label>
            </div>
          </div>
          <div className="row justify-content-center">
            <button onClick={inProgress} className="btn btn-outline-dark">Submit Component</button>
          </div>

        </form>

      </div>

    </div>

  )
}

export default NewPartForm