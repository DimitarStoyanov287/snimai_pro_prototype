document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('psw').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        role: document.getElementById('role').value,
        experience: document.getElementById('experience').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber')?.value,
        location: document.getElementById('location')?.value,
    };

    const response = await fetch('/routes/auth.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const result = await response.json();
        alert('User registered successfully');
        
        // Store JWT token in localStorage for auto-login
        localStorage.setItem('authToken', result.token);
        
        // Redirect to main page or user dashboard
        window.location.href = 'index.html';
    } else {
        const errorText = await response.text();
        alert(`Error registering user: ${errorText}`);
    }
});

// Login User
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const result = await response.json();
        alert('Login successful');
        
        // Store token in localStorage for future requests
        localStorage.setItem('authToken', result.token);

        // Redirect to dashboard or homepage after login
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
});
