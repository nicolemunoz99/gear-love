import React from 'react';

const NewPartForm = (props) => {

  const hideNewPartForm = (e) => {
    if (e.target.className.includes('modal-backdrop') || e.target.className.includes('close-me')) {
      props.updatePartFormView(false);
    }
  }
console.log(props.currentBike)
  const noPointerEvents = () => { }

  return (
    <div onClick={hideNewPartForm} className="d-flex justify-content-center modal-backdrop">

      <div className='newPartForm p-5 border rounded'>

        <form onClick={noPointerEvents}>
        <div className="h2 mb-5">Enter a new part</div>
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
          <div className="form-group row mt-5">
            <label className="col-sm-4 col-form-label">New part? </label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="current-wear" placeholder="estimated distance/time on this part has?"></input>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label class="col-sm-4 col-form-label" >Usage metric: </label>
            <div className="col-sm-4">
              <input type="checkbox" id="inlineCheckbox1" value="option1"></input>
              <label className="ml-2">Hours</label>
            </div>
            <div className="col-sm-4">
              <input type="checkbox" id="inlineCheckbox1" value="option1"></input>
              <label className="ml-2">Distance</label>
            </div>
          </div>
          
        </form>

      </div>

    </div>

  )
}

export default NewPartForm