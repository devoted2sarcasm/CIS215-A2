const express = require('express');
const path = require('path');
const dbOperations = require('./dbOperations');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('C:/NCMC/CIS215/CIS215-A2'));

app.get('/', (req, res) => {
    res.sendFile('c:/ncmc/cis215/cis215-a2/indexcar.html');
    });

// Example route to get all cars
app.get('/api/cars', (req, res) => {
  dbOperations.getAllCars((err, cars) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(cars);
  });
});

// Example route to add a new car
app.post('/api/cars', (req, res) => {
  const { make, model, year } = req.body;
  
  dbOperations.addCar(make, model, year, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Car added successfully!' });
    res.redirect('/indexcar.html');
  });
});

//add to vehicle table
app.post('/api/add-vehicle', (req, res) => {
    const { make, model, year, dateAdded, mileage} = req.body;
    
    dbOperations.addCar(make, model, year, dateAdded, mileage, (err) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Vehicle added successfully!' });
        res.redirect('/indexcar.html');
    });
});

//route to add personnel
app.post('/api/add-person', (req, res) => {
    const { firstName, lastName, middleName, dob, license, streetAddress, city, state, zip } = req.body;
    
    dbOperations.addPerson(firstName, lastName, middleName, dob, license, streetAddress, city, state, zip, (err) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Person added successfully!' });
        res.redirect('/indexcar.html');
    });
});

app.get('/api/available', (req, res) => {
    dbOperations.getAvail((err, availableCars) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(availableCars);
    });
  });

app.post('/api/start-trip', (req, res) => {
    const { vehicleId, driverId, passengerId, reason, destination, condition, dateStart, timeStart, fuel } = req.body;
    
    dbOperations.startTrip(vehicleId, driverId, passengerId, reason, destination, condition, dateStart, timeStart, fuel, (err, trip) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(trip);
        res.redirect('/indexcar.html');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Close the database connection when the server is closed
process.on('exit', () => {
  dbOperations.closeDatabase();
});
