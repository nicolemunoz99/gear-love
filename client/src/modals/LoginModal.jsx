import React, { useState } from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import urls from '../../../urls.js'
import strava from '../../stravaAccess.js'

const initialFormValues = {
  username: '',
  pw: ''
};

const LoginModal = (props) => {
  const [userInputs, updateUserInputs] = useState(initialFormValues);
  const [loginIsValid, updateLoginIsValid] = useState(null);

  const handleInput = (e) => {
    let tempState = JSON.parse(JSON.stringify(userInputs));
    tempState[e.target.id] = e.target.value;
    updateUserInputs(tempState);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(userInputs);
    axios.get(`${urls.api}/users/login`, {
      params: userInputs
    })
      .then(response => {
        console.log(response.status)
        if (response.status === 204) {
          updateLoginIsValid(false);
          return;
        }

      })
  };

  const switchToSignup = () => { props.changeModal('signup'); }

  return (
    <Modal width={5} title="Login" changeModal={props.changeModal}>
      <form>
        <div className="form-group row my-4 justify-content-center">
          <div className="col-8 col-lg-12">
            <label>Username</label>
            <input onChange={handleInput} value={userInputs.username} type="text" className="form-control " id="username" placeholder=""></input>
          </div>
        </div>
        <div className="form-group row my-4 justify-content-center">
          <div className="col-8 col-lg-12">
            <label>Password</label>
            <input onChange={handleInput} value={userInputs.pw} type="password" className="form-control " id="pw" placeholder=""></input>
          </div>
        </div>

        {loginIsValid === false ?
          <div className="row justify-content-center mt-4 pt-4">
          <div className="col-12 error-text">
            Username or password incorrect.
          </div>
        </div>
        : null
        }
        <div className="row justify-content-center mt-4 pt-4">
          <div className="col-12">
            <button onClick={handleLoginSubmit} className="btn btn-outline-dark full-width">Log in</button>
          </div>
        </div>
        
        <div className="container mt-1">
          <div className="row">
            <div className="col-12 text-center">
              Don't have a Chain Love account?
            <div onClick={switchToSignup} className="cursor-pointer"><u>Sign up</u></div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default LoginModal;