-- DROP DATABASE chainlove;
CREATE DATABASE chainlove;

\c chainlove;
CREATE SCHEMA IF NOT EXISTS gear;

CREATE TABLE IF NOT EXISTS gear.users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  pw VARCHAR NOT NULL,
  strava_id INT,
  access_token VARCHAR,
  expires_at INT,
  expires_in INT,
  refresh_token VARCHAR,
  scope VARCHAR,
  join_date DATE DEFAULT CURRENT_DATE,
  measurement_preference VARCHAR
);

-- bikes table: of bikes and total miles on it
CREATE TABLE IF NOT EXISTS gear.bikes(
  strava_id INT,
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

-- parts table: of bikeID, component, component-specific miles, component details
CREATE TABLE IF NOT EXISTS gear.parts(
  part_id SERIAL primary key NOT NULL,
  bike_id VARCHAR,
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
