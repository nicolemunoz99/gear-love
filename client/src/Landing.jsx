import React from 'react';

const Landing = (props) => {
  
  
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <ul>
          <li>
            Track your bike components' wear by syncing with your <a target="NONE" href="http://strava.com">Strava</a> activities
          </li>
          <li>
            Receive notice when a component is due to be checked for wear, should be serviced or replaced
          </li>
          <li>
            Define custom components
          </li>
          <li>
            Option to specify a custom notification interval or use default settings
          </li>
          <li>
            Select your part's useage metric based on mileage or hours-in-use
          </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Landing;