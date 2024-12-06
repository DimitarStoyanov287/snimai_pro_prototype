document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const type = document.getElementById('type').value;
    const location = document.getElementById('location').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Perform an API call to fetch the equipment based on the search criteria
    fetch(`/equipment/search?type=${type}&location=${location}&startDate=${startDate}&endDate=${endDate}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle the data from the response
            // Display the search results (You can add code to update the UI)
        })
        .catch(error => console.error('Error fetching equipment:', error));
});
// Register User
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        alert('User registered successfully');
    } else {
        alert('Error registering user');
    }
});

// Login User
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginData = {
        username: document.getElementById('loginUsername').value,
        password: document.getElementById('loginPassword').value
    };
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    });
    if (response.ok) {
        alert('Login successful');
        document.getElementById('createEquipmentForm').style.display = 'block'; // Show equipment form
        document.getElementById('loginForm').style.display = 'none'; // Hide login form
    } else {
        alert('Invalid credentials');
    }
});

// Create Equipment Listing
document.getElementById('createEquipmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const equipmentData = {
        name: document.getElementById('equipmentName').value,
        description: document.getElementById('equipmentDescription').value,
        rentalPrice: document.getElementById('rentalPrice').value,
        location: document.getElementById('location').value
    };
    const response = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipmentData)
    });
    if (response.ok) {
        alert('Equipment listing created successfully');
        document.getElementById('createEquipmentForm').reset();
    } else {
        alert('Error creating equipment listing');
    }
});