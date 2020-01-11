-- CREATE DATABASE chainlove;

\c chainlove;
-- CREATE SCHEMA gear;
DROP TABLE gear.parts;
DROP TABLE gear.bikes;
-- bikes table: of bikes and total miles on it
CREATE TABLE gear.bikes(
  bike_id VARCHAR,
  user_id BIGINT,
  brand VARCHAR,
  model VARCHAR,
  model_year INT,
  distanceAtSignup INT,
  date_added VARCHAR
);

-- parts table: of bikeID, component and component-specific miles
CREATE TABLE gear.parts(
  part_id SERIAL primary key NOT NULL,
  bike_id VARCHAR,
  dist_when_added INT,
  part_type VARCHAR,
  part_brand VARCHAR,
  part_model VARCHAR,
  lifespan_dist INT,
  criteria_choice VARCHAR DEFAULT 'distance'
);

CREATE INDEX bike_id_idx1 ON gear.bikes (bike_id);
CREATE INDEX bike_id_idx2 ON gear.parts (bike_id);