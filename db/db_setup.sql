CREATE DATABASE chainlove;

\c chainlove;
CREATE SCHEMA gear;

-- bikes table: of bikes and total miles on it
CREATE TABLE gear.bikes(
  bike_id primary key NOT NULL,
  username VARCHAR,
  brand VARCHAR,
  model VARCHAR,
  model_year INT,
  miles INT,
  date_added VARCHAR,
  measurement_preference VARCHAR DEFAULT 'km' CHECK (criteria_choice='km' OR criteria_choice='mi')
)

-- parts table: of bikeID, component and component-specific miles
CREATE TABLE gear.parts(
  part_id SERIAL primary key NOT NULL
  bike_id VARCHAR,
  dist_when_added INT,
  part_type VARCHAR,
  part_brand VARCHAR,
  part_model VARCHAR,
  lifespan_dist INT,
  criteria_choice VARCHAR DEFAULT 'distance' CHECK (criteria_choice='distance' OR criteria_choice='time')
  FOREIGN KEY (bike_id) REFERENCES gear.bikes (bike_id) ON DELETE CASCADE
)

CREATE INDEX bike_id_idx1 ON gear.bikes (bike_id);
CREATE INDEX bike_id_idx2 ON gear.parts (bike_id);