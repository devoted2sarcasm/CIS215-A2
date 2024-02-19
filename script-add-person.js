document.addEventListener('DOMContentLoaded', () => {
    // Wait for the DOM to be fully loaded
  
    // Get references to form elements
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const middleNameInput = document.getElementById('middlename');
    const dobInput = document.getElementById('dob');
    const licenseInput = document.getElementById('license');
    const streetAddressInput = document.getElementById('street-address');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipInput = document.getElementById('zip');
  
    // Get reference to the add button
    const addButton = document.getElementById('add');
  
    // Add click event listener to the add button
    addButton.addEventListener('click', () => {
      // Get values from form inputs
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const middleName = middleNameInput.value;
      const dob = dobInput.value;
      const license = licenseInput.value;
      const streetAddress = streetAddressInput.value;
      const city = cityInput.value;
      const state = stateInput.value;
      const zip = zipInput.value;
  
      // Validate form inputs (add your validation logic here)
  
      // Call a function to add the person (replace with your actual implementation)
      addPerson(firstName, lastName, middleName, dob, license, streetAddress, city, state, zip);
    });
  
    // Function to add the person (replace this with your actual implementation)
    function addPerson(firstName, lastName, middleName, dob, license, streetAddress, city, state, zip) {
      // Make an API request to add the person
      // Example: You can use fetch or another library to send a POST request to your server endpoint
      fetch('/api/add-person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          middleName,
          dob,
          license,
          streetAddress,
          city,
          state,
          zip,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add the person');
          }
          return response.json();
        })
        .then(data => {
          // Handle success (replace with your actual success handling logic)
          console.log('Person added successfully:', data);
        })
        .catch(error => {
          // Handle error (replace with your actual error handling logic)
          console.error('Error adding the person:', error.message);
        });
    }
  });
  