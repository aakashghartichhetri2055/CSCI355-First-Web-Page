function showNavigator() {
    const info = `
        <ul>
            <li>App Name: ${navigator.appName}</li>
            <li>App Version: ${navigator.appVersion}</li>
            <li>User Agent: ${navigator.userAgent}</li>
            <li>Platform: ${navigator.platform}</li>
            <li>Language: ${navigator.language}</li>
        </ul>
    `;
    document.getElementById('info').innerHTML = info;
}

function showWindow() {
    const info = `
        <ul>
            <li>Window Inner Width: ${window.innerWidth}</li>
            <li>Window Inner Height: ${window.innerHeight}</li>
            <li>Window Outer Width: ${window.outerWidth}</li>
            <li>Window Outer Height: ${window.outerHeight}</li>
        </ul>
    `;
    document.getElementById('info').innerHTML = info;
}

function showScreen() {
    const info = `
        <ul>
            <li>Screen Width: ${screen.width}</li>
            <li>Screen Height: ${screen.height}</li>
            <li>Screen Color Depth: ${screen.colorDepth}</li>
            <li>Screen Pixel Depth: ${screen.pixelDepth}</li>
        </ul>
    `;
    document.getElementById('info').innerHTML = info;
}

function showLocation() {
    const info = `
        <ul>
            <li>Location URL: ${location.href}</li>
            <li>Location Protocol: ${location.protocol}</li>
            <li>Location Hostname: ${location.hostname}</li>
            <li>Location Port: ${location.port}</li>
            <li>Location Pathname: ${location.pathname}</li>
        </ul>
    `;
    document.getElementById('info').innerHTML = info;
}

function showGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const info = `
                    <ul>
                        <li>Latitude: ${position.coords.latitude}</li>
                        <li>Longitude: ${position.coords.longitude}</li>
                        <li>Accuracy: ${position.coords.accuracy} meters</li>
                    </ul>
                `;
                document.getElementById('info').innerHTML = info;
            },
            (error) => {
                document.getElementById('info').innerHTML = `<p>Geolocation error: ${error.message}</p>`;
            }
        );
    } else {
        document.getElementById('info').innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    const formData = {
        name: name,
        email: email,
        message: message
    };

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Form submitted successfully!');
            document.getElementById('contact-form').reset();
        } else {
            alert('Failed to submit form');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
