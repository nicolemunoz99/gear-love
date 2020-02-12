CREATE DATABASE IF NOT EXISTS chainlove;

\c chainlove;
CREATE SCHEMA IF NOT EXISTS gear;

-- bikes table: of bikes and total miles on it
CREATE TABLE IF NOT EXISTS gear.bikes(
  bike_id VARCHAR,
  user_id BIGINT,
  brand VARCHAR,
  model VARCHAR,
  model_year INT,
  distanceAtSignup INT,
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
  criteria_choice VARCHAR DEFAULT 'distance'
);

CREATE INDEX bike_id_idx1 ON gear.bikes (bike_id);
CREATE INDEX bike_id_idx2 ON gear.parts (bike_id);

CREATE SCHEMA IF NOT EXISTS sessions;

CREATE TABLE IF NOT EXISTS sessions.users(
  session_id VARCHAR primary key NOT NULL,
  access_token VARCHAR
)