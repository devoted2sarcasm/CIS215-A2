// script-start-trip.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch cars data and populate the table
    fetchCarsData();

    // Event listener for the Start Trip button
    document.getElementById("start-trip").addEventListener("click", startTrip);

    // Event listener for the Cancel button
    document.getElementById("cancel").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

function fetchCarsData() {
    // Open a WebSQL database
    const db = openDatabase("carsDB", "1.0", "Cars Database", 2 * 1024 * 1024);

    // Execute a query to fetch cars data
    db.transaction(function (tx) {
        tx.executeSql("SELECT id, veh_make as Make, veh_model as Model, veh_year as Year FROM Vehicle WHERE current_use = 0;", [], function (tx, results) {
            const carsData = results.rows;
            populateCars(carsData);
        });
    });
}

function populateCars(carsData) {
    const carListPlaceholder = document.getElementById("car-list-placeholder");

    for (let i = 0; i < carsData.length; i++) {
        const car = carsData.item(i);
        const row = document.createElement("tr");
        row.innerHTML = `<td>${car.id}</td>
                         <td>${car.Make}</td>
                         <td>${car.Model}</td>
                         <td>${car.Year}</td>`;
        carListPlaceholder.appendChild(row);
    }
}

function startTrip(event) {
    event.preventDefault();

    // Get form values
    const vehicleId = document.getElementById("vehicleid").value;
    const driverId = document.getElementById("driver").value;
    // ... Get other form values

    // Perform validation checks
    if (!validateForm(vehicleId, driverId /*, ... other form values */)) {
        return;
    }

    // Perform additional checks (e.g., check if vehicleId and driverId exist in the database)

    // If all checks passed, proceed with inserting data into the database
    const db = openDatabase("carsDB", "1.0", "Cars Database", 2 * 1024 * 1024);
    db.transaction(function (tx) {
        // Execute the insert query
        tx.executeSql("INSERT INTO Trips (id, vehicle_used, driver, /*... other columns */) VALUES ((SELECT MAX(id) FROM Trips) + 1, ?, ? /*... other values */);", [vehicleId, driverId /*... other values */], function (tx, results) {
            alert("Trip started successfully");
            // Optionally, redirect to another page or perform additional actions
        }, function (tx, error) {
            alert("Failed to start trip. Please try again.");
            console.error(error.message);
        });
    });
}

function validateForm(vehicleId, driverId /*, ... other form values */) {
    // Add your validation logic here
    // Return true if validation passes, false otherwise

    // Example validation for non-empty fields
    if (vehicleId.trim() === "" || driverId.trim() === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    return true;
}
