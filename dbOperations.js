const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('cars.db');

// Function to get all cars from the database
function getAllCars(callback) {
  db.all('SELECT * FROM Vehicle', (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, rows);
  });
}

//function to retrieve available cars
function getAvail(callback) {
    db.all('SELECT id, veh_make as "Make", veh_model as "Model", veh_year as "Year" FROM Vehicle WHERE current_use = 0 OR current_use IS null OR current_use = false;', (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      // Convert the rows to a JSON object if needed
      const result = rows.map(row => ({
        id: row.id,
        Make: row.Make,
        Model: row.Model,
        Year: row.Year,
      }));
      callback(null, result);
    });
  }

// Function to start a trip
function startTrip(vehicleId, driverId, passengerId, reason, destination, condition, dateStart, timeStart, fuel, callback) {
  db.run('INSERT INTO Trips (vehicle_used, driver, passenger, reason_for_trip, destination, condition, date_start, time_start, fuel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [vehicleId, driverId, passengerId, reason, destination, condition, dateStart, timeStart, fuel], function (err) {
    if (err) {
      callback(err);
      return;
    }
    db.get('SELECT * FROM Trips WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, row);
    });
  });
}

//function to end a trip, autopopulating to select from the current cars in use to select the trip to end


// Function to add a new car to the database
function addCar(make, model, year, date_added, miles, callback) {

    db.run('INSERT INTO Vehicle (veh_make, veh_model, veh_year, added_to_fleet, original_mileage) VALUES (?, ?, ?, ?, ?)', [make, model, year, date_added, miles], function (err) {
        if (err) {
            if (callback && typeof callback === 'function') {
                callback(err);
            } else {
                console.error('Error in addCar:', err);
            }
            return;
        }
        
        if (callback && typeof callback === 'function') {
            callback(null);
        } else {
            console.error('Callback not provided or not a function in addCar');
        }
    });
}



//function for adding personnel to the database
function addPerson(firstName, lastName, middleName, dob, driver_lic_num, street_address, city, state, zip, callback) {
    db.run('INSERT INTO Occupants (firstname, lastname, middlename, dob, driver_lic_num, street_address, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, middleName, dob, driver_lic_num, street_address, city, state, zip], (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  
}

//function to end a trip
function endTrip(tripId, endingMileage, vehCondEnd, dateEnd, timeEnd, fuelEnd, issuesThisTrip, callback) {
    db.run('UPDATE Trips SET ending_mileage = ?, veh_cond_end = ?, date_end = ?, time_end = ?, fuel_end = ?, issues_this_trip = ? WHERE id = ?', [endingMileage, vehCondEnd, dateEnd, timeEnd, fuelEnd, issuesThisTrip, tripId], (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  }

// Close the database connection when done
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

module.exports = {
    getAllCars,
    addCar,
    getAvail,
    startTrip,
    addPerson,
    endTrip,
  // Add more functions here as needed
    closeDatabase,
};
