document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('psw').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        role_id: document.getElementById('role').value, // Assume it's a dropdown
        experience: document.getElementById('experience').value,
        email: document.getElementById('email').value,
    };

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('User registered successfully');
        window.location.href = 'login.html';
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
});
