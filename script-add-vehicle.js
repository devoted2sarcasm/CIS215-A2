document.addEventListener('DOMContentLoaded', () => {
    // Wait for the DOM to be fully loaded

    // Get references to form elements
    const makeInput = document.getElementById('veh-make');
    const modelInput = document.getElementById('veh-model');
    const yearInput = document.getElementById('veh-year');
    const dateAddedInput = document.getElementById('date-added');
    const mileageInput = document.getElementById('mileage');

    // Get reference to the add button
    const addButton = document.getElementById('add');

    // Add click event listener to the add button
    addButton.addEventListener('click', () => {
        // Get values from form inputs
        const make = makeInput.value;
        const model = modelInput.value;
        const year = yearInput.value;
        const dateAdded = dateAddedInput.value;
        const mileage = mileageInput.value;

        // Validate form inputs (add your validation logic here)

        // Call a function to add the vehicle (replace with your actual implementation)
        addVehicle(make, model, year, dateAdded, mileage, mileage);
    });

    // Function to add the vehicle (replace this with your actual implementation)
    function addVehicle(make, model, year, dateAdded, mileage) {
        // Make an API request to add the vehicle
        // Example: You can use fetch or another library to send a POST request to your server endpoint
        fetch('/api/add-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                make,
                model,
                year,
                dateAdded,
                mileage,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add the vehicle');
                }
                return response.json();
            })
            .then(data => {
                // Handle success (replace with your actual success handling logic)
                console.log('Vehicle added successfully:', data);
                // Redirect to indexcar.html after successful addition
                window.location.href = '/indexcar.html';
            })
            .catch(error => {
                // Handle error (replace with your actual error handling logic)
                console.error('Error adding the vehicle:', error.message);
            });
    }
});
