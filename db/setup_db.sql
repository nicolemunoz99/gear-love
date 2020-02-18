CREATE DATABASE chainlove;

\c chainlove;
CREATE SCHEMA IF NOT EXISTS gear;

CREATE TABLE IF NOT EXISTS gear.users(
  user_id SERIAL primary key NOT NULL
  username VARCHAR NOT NULL,
  pw VARCHAR NOT NULL,
  strava_id BIGINT,
  access_token VARCHAR,
  expires_at INT,
  expires_in INT,
  refresh_token VARCHAR,
  scope VARCHAR,
  date VARCHAR
);

-- bikes table: of bikes and total miles on it
CREATE TABLE IF NOT EXISTS gear.bikes(
  user_id BIGINT,
  bike_id VARCHAR,
  brand VARCHAR,
  model VARCHAR,
  model_year INT,
  distance_at_signup INT,
  date_added VARCHAR
);

-- parts table: of bikeID, component, component-specific miles, component details
CREATE TABLE IF NOT EXISTS gear.parts(
  part_id SERIAL primary key NOT NULL,
  bike_id VARCHAR,
  dist_on_add INT,
  time_on_add INT,
  type VARCHAR,
  brand VARCHAR,
  model VARCHAR,
  lifespan_dist INT,
  lifespan_time INT,
  tracking_method VARCHAR,
  useage_metric VARCHAR
);
