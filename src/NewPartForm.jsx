import React from 'react';

const NewPartForm = (props) => {

  const hideNewPartForm = () => {
    props.updatePartFormView(false)
  }

  return (
    <div onClick={hideNewPartForm} className="d-flex justify-content-center modal-backdrop ">
      <div className='newPartForm p-5 border rounded'>

        <form>
          <div class="form-group row">
            <label for="inputPart" class="col-sm-4 col-form-label">Basics: </label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="part-type" placeholder="Type"></input>
            </div>
          </div>
          <div class="form-group row justify-content-end">

            <div class="col-sm-4">
              <input type="email" class="form-control" id="part-type" placeholder="Brand"></input>
            </div>
            <div class="col-sm-4">
              <input type="email" class="form-control" id="part-type" placeholder="Model"></input>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="inputPart" class="col-sm-4 col-form-label">Advanced: </label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="part-type" placeholder="estimated miles this part has? lifetime of bike?"></input>
            </div>
          </div>
        </form>

      </div>
    </div>

  )
}

export default NewPartForm