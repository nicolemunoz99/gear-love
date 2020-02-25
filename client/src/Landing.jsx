import React from 'react';

const Landing = (props) => {
  
  const handleClick = (e) => {
    props.changeModal(e.target.id)
  }
  
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8 text-center">
          <div>
            <button onClick={handleClick} id="signup" className="full-width btn btn-outline-dark my-4">Sign up</button>
          </div>
          or
          <div>
            <button onClick={handleClick} id="login" className="full-width btn btn-outline-dark my-4">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Landing;