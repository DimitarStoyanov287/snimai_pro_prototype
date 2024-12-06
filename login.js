document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        alert('Login successful');
        localStorage.setItem('token', result.token); // Optional: Store token for session
        window.location.href = 'index.html'; // Redirect after login
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
});
