const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('cars.db');

// Create the Occupants table
db.run(`
  CREATE TABLE IF NOT EXISTS "Occupants" (
    "id" INTEGER NOT NULL UNIQUE,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "middlename" TEXT,
    "dob" INTEGER NOT NULL,
    "driver_lic_num" TEXT NOT NULL,
    "street_address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" INTEGER,
    "trips_as_driver" INTEGER,
    "trips_as_pass" INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`, (err) => {
  if (err) {
    console.error('Error creating Occupants table:', err);
  } else {
    console.log('Occupants table created successfully!');
  }
});

// Create the Trips table
db.run(`
  CREATE TABLE IF NOT EXISTS "Trips" (
    "id" INTEGER NOT NULL,
    "vehicle_used" INTEGER NOT NULL,
    "driver" INTEGER NOT NULL,
    "passenger" INTEGER,
    "starting_mileage" INTEGER NOT NULL,
    "ending_mileage" INTEGER NOT NULL,
    "veh_cond_start" TEXT NOT NULL,
    "veh_cond_end" TEXT NOT NULL,
    "date_start" INTEGER NOT NULL,
    "date_end" INTEGER NOT NULL,
    "time_start" INTEGER NOT NULL,
    "time_end" INTEGER NOT NULL,
    "fuel_begin" INTEGER NOT NULL,
    "fuel_end" INTEGER NOT NULL,
    "destination_zip" INTEGER NOT NULL,
    "issues_this_trip" TEXT,
    "reason_for_trip" TEXT NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("driver") REFERENCES "Occupants"("id"),
    FOREIGN KEY("vehicle_used") REFERENCES "Vehicle"("id")
  )
`, (err) => {
  if (err) {
    console.error('Error creating Trips table:', err);
  } else {
    console.log('Trips table created successfully!');
  }
});

// Create the Vehicle table
db.run(`
  CREATE TABLE IF NOT EXISTS "Vehicle" (
    "id" INTEGER NOT NULL UNIQUE,
    "veh_make" TEXT NOT NULL,
    "veh_model" TEXT NOT NULL,
    "veh_year" INTEGER NOT NULL,
    "added_to_fleet" INTEGER NOT NULL,
    "original_mileage" INTEGER NOT NULL,
    "total_mileage" INTEGER,
    "mileage_since_oc" INTEGER,
    "current_use" BOOLEAN,
    "need_oil_change" BOOLEAN,
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`, (err) => {
  if (err) {
    console.error('Error creating Vehicle table:', err);
  } else {
    console.log('Vehicle table created successfully!');
  }
});

// Create the trigger
db.run(`
  CREATE TRIGGER IF NOT EXISTS update_oil_change
  AFTER UPDATE OF total_mileage ON Vehicle
  WHEN NEW.mileage_since_oc >= 4000
  BEGIN
      UPDATE Vehicle
      SET need_oil_change = 1
      WHERE Vehicle.id = NEW.id;
  END;
`, (err) => {
  if (err) {
    console.error('Error creating trigger:', err);
  } else {
    console.log('Trigger created successfully!');
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
