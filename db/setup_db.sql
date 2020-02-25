DROP DATABASE chainlove;
CREATE DATABASE chainlove;

\c chainlove;

CREATE SCHEMA IF NOT EXISTS users;

CREATE TABLE IF NOT EXISTS users.auth(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  pw VARCHAR NOT NULL,
  access_token VARCHAR,
  expires_at INT,
  expires_in INT,
  refresh_token VARCHAR,
  scope VARCHAR,
  salt VARCHAR
);

CREATE TABLE IF NOT EXISTS users.sessions(
  user_id INT REFERENCES users.auth (user_id),
  session VARCHAR,
  expires_at BIGINT
);

CREATE TABLE IF NOT EXISTS users.info(
  user_id INT REFERENCES users.auth (user_id),
  strava_id INT PRIMARY KEY,
  join_date DATE DEFAULT CURRENT_DATE,
  measurement_preference VARCHAR,
  last_ride_id INT,
  last_ride_name VARCHAR
);


CREATE SCHEMA IF NOT EXISTS gear;

-- bikes 
CREATE TABLE IF NOT EXISTS gear.bikes(
  strava_id INT REFERENCES users.info (strava_id),
  bike_id VARCHAR PRIMARY KEY,
  name VARCHAR,
  brand_name VARCHAR,
  model_name VARCHAR,
  description VARCHAR,
  frame_type VARCHAR,
  dist_on_add DECIMAL,
  dist_current DECIMAL,
  time_on_add DECIMAL,
  time_current DECIMAL,
  image VARCHAR,
  date_added DATE DEFAULT CURRENT_DATE
);

-- parts 
CREATE TABLE IF NOT EXISTS gear.parts(
  part_id SERIAL primary key NOT NULL,
  bike_id VARCHAR references gear.bikes (bike_id),
  type VARCHAR,
  custom_type VARCHAR,
  brand VARCHAR,
  model VARCHAR,
  dist_on_add DECIMAL,
  time_on_add DECIMAL,
  lifespan_dist DECIMAL,
  lifespan_time DECIMAL,
  tracking_method VARCHAR,
  useage_metric VARCHAR
);
