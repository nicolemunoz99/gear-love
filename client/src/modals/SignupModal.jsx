import React, { useState } from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import urls from '../../../urls.js'
import strava from '../../stravaAccess.js'

const initFormValues = {
  username: '',
  pw1: '',
  pw2: ''
};


const SignupModal = (props) => {
  const [userInputs, updateInputs] = useState(initFormValues);
  const [usernameExists, updateUsernameExists] = useState(null);
  const [passwordsMatch, updatePasswordsMatch] = useState(true);
  const [registrationSuccess, updateRegistrationSuccess] = useState(false);

  const handleInput = (e) => {
    const tempState = JSON.parse(JSON.stringify(userInputs));
    tempState[e.target.id] = e.target.value;
    updateInputs(tempState);
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (userInputs.username.length < 4) {
      updateUsernameExists(true);
      return
    }
    axios.get(`${urls.api}/users?verify=true&username=${userInputs.username.toLowerCase()}`)
      .then(response => {
        if (response.data.userExists === 0) {
          updateUsernameExists(false);
        } else {
          updateUsernameExists(true);
        }
      })
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userInputs.pw1 !== userInputs.pw2) {
      updatePasswordsMatch(false);
      return
    }
    let signupInfo = {
      username: userInputs.username,
      pw: userInputs.pw1
    };
    axios.post(`${urls.api}/users`, signupInfo)
      .then(() => {
        updateRegistrationSuccess(true);
      });
  };

  const switchToLogin = () => {
    props.changeModal('login');
  }

  return (

    <Modal width={5} title="Sign up" changeModal={props.changeModal}>
      <form>
        <div className="form-group row my-4 justify-content-center">
          <div className="col-8 col-lg-12">
            {usernameExists !== false ?
              <div>
                <label>Username</label>
                <input onChange={handleInput} value={userInputs.username} type="text" className="form-control " id="username" placeholder=""></input>
                {usernameExists === true ?
                  <div className="error-text">Username already taken</div>
                  : null
                }
                <div className="row justify-content-center mt-4">
                  <button onClick={handleUsernameSubmit} className="btn btn-outline-dark">Check</button>
                </div>
              </div>
              : <div>{`Username: ${userInputs.username}`}</div>
            }
          </div>
          <div className="w-100"></div>

        </div>

        {usernameExists === false && registrationSuccess === false ?
          <div>
            <div className="form-group row mt-4 justify-content-center">
              <div className="col-sm-12 col-md-8 col-lg-12">
                <label>Password</label>
                <input onChange={handleInput} type="password" className="form-control" id="pw1"></input>
              </div>
            </div>
            <div className="form-group row mb-4 justify-content-center">
              <div className="col-8 col-lg-12">
                <label>Verify password</label>
                <input onChange={handleInput} type="password" className="form-control" id="pw2"></input>
                {passwordsMatch === false ?
                  <div className="error-text">Passwords don't match</div>
                  : null
                }
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-12">
                <button onClick={handleFormSubmit} className="btn btn-outline-dark full-width">Register with Chainlove</button>
              </div>
            </div>
          </div>
          : null
        }

        {registrationSuccess ?
          <div>
            <div className="mb-3">Successfully created Chain Love account.</div>
            <div>
              <a href={`https://www.strava.com/oauth/authorize` +
                      `?client_id=${strava.clientId}` +
                      `&response_type=code` +
                      `&redirect_uri=${urls.api}/users/signup?username=${userInputs.username}` +
                      `&approval_prompt=force&scope=read`}>
                        Authorize Chain Love to import your Strava data.
              </a>
            </div>
            <small>(You'll be redirected to Strava's authorization page.)</small>
          </div>
          : null
        }
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
          Already have a Chain Love account?  
          <div onClick={switchToLogin} className="cursor-pointer"><u>Log in</u></div>
          </div>
          </div>
        </div>
      </form>
    </Modal>

  )
}

export default SignupModal;