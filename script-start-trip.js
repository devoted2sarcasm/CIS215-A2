document.addEventListener('DOMContentLoaded', () => {
    // Wait for the DOM to be fully loaded
  
    // Get references to form elements
    const vehicleIdInput = document.getElementById('vehicleid');
    const driverInput = document.getElementById('driver');
    const passengerInput = document.getElementById('passenger');
    const reasonInput = document.getElementById('reason');
    const destinationInput = document.getElementById('destination');
    const conditionInput = document.getElementById('condition');
    const dateStartInput = document.getElementById('date-start');
    const timeStartInput = document.getElementById('time-start');
    const fuelInput = document.getElementById('fuel');
  
    // Get reference to the start trip button
    const startTripButton = document.getElementById('start-trip');
  
    // Add click event listener to the start trip button
    startTripButton.addEventListener('click', () => {
      // Get values from form inputs
      const vehicleId = vehicleIdInput.value;
      const driverId = driverInput.value;
      const passengerId = passengerInput.value;
      const reason = reasonInput.value;
      const destination = destinationInput.value;
      const condition = conditionInput.value;
      const dateStart = dateStartInput.value;
      const timeStart = timeStartInput.value;
      const fuel = fuelInput.value;
    
      // Call a function to start the trip (replace with your actual implementation)
      startTrip(vehicleId, driverId, passengerId, reason, destination, condition, dateStart, timeStart, fuel);
    });
  
    // Function to start the trip (replace this with your actual implementation)
    function startTrip(vehicleId, driverId, passengerId, reason, destination, condition, dateStart, timeStart, fuel) {
      // Make an API request to start the trip
      // Example: You can use fetch or another library to send a POST request to your server endpoint
      fetch('/api/start-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId,
          driverId,
          passengerId,
          reason,
          destination,
          condition,
          dateStart,
          timeStart,
          fuel,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to start the trip');
          }
          return response.json();
        })
        .then(data => {
          // Handle success (replace with your actual success handling logic)
          console.log('Trip started successfully:', data);
        })
        .catch(error => {
          // Handle error (replace with your actual error handling logic)
          console.error('Error starting the trip:', error.message);
        });
    }
  });
  