document.addEventListener('DOMContentLoaded', () => {
    // Fetch available cars and populate the drop-down (your existing code)
    fetch('/api/carsontrips')
        .then(response => response.json())
        .then(data => {
            const vehicleDropdown = document.getElementById('vehicleid');
            data.forEach(car => {
                const option = document.createElement('option');
                option.value = car.id;
                option.text = `${car.Make} ${car.Model} ${car.Year}`;
                vehicleDropdown.add(option);
            });
        })
        .catch(error => console.error('Error fetching available cars:', error));

    // Add event listener for the "End Trip" button
    const endTripButton = document.getElementById('end-trip');
    endTripButton.addEventListener('click', () => {
        // Retrieve form data and call the endTrip function
        const endingMileage = document.getElementById('miles-traveled').value;
        const vehCondEnd = document.getElementById('condition').value;
        const dateEnd = document.getElementById('date-end').value;
        const timeEnd = document.getElementById('time-end').value;
        const fuelEnd = document.getElementById('fuel').value;
        const issuesThisTrip = document.getElementById('issues').value;

        // Get the selected trip ID from the hidden input
        const tripId = document.getElementById('tripid').value;

        // Make an API request to end the trip
        fetch('/api/end-trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tripId,
                endingMileage,
                vehCondEnd,
                dateEnd,
                timeEnd,
                fuelEnd,
                issuesThisTrip,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to end the trip - Server responded with ${response.status}: ${response.statusText}`);
            }
            console.log('Trip ended successfully');
            // Handle success (replace with your actual success handling logic)
        })
        .catch(error => {
            // Log the full error object for debugging
            console.error('Error ending the trip:', error);

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server response data:', error.response.data);
                console.error('Server response status:', error.response.status);
                console.error('Server response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }

            // Handle error (replace with your actual error handling logic)
            console.error('Failed to end the trip:', error.message);
        });
    });
});
