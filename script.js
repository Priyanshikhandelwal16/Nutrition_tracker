function handleLogin(event) {
    event.preventDefault();
    // Mock authentication logic (can be replaced with real logic)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert('Login successful!');
        window.location.href = 'tracker.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Handle Sign-Up
function handleSignUp(event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        email: document.getElementById('email').value,
    };

    // Save user data in localStorage for simplicity
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Account created successfully!');
    window.location.href = 'index.html'; // Redirect to login page
}

// Handle Meal Tracking
document.getElementById('mealTracker')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const meals = {
        breakfast: document.getElementById('breakfast').value,
        lunch: document.getElementById('lunch').value,
        snacks: document.getElementById('snacks').value,
        dinner: document.getElementById('dinner').value,
    };

    // Save meal data in localStorage for report generation
    localStorage.setItem('meals', JSON.stringify(meals));
    window.location.href = 'report.html'; // Redirect to report page
});

// Handle Report Generation
if (window.location.pathname.includes('report.html')) {
    const meals = JSON.parse(localStorage.getItem('meals'));

    function calculateCalories(meals) {
        const calorieData = {
            egg: 78,
            toast: 80,
            rice: 130,
            chicken: 165,
            salad: 30,
            apple: 95,
            biscuit: 50,
            soup: 150,
        };

        let totalCalories = 0;
        for (const meal in meals) {
            const items = meals[meal].split(',').map(item => item.trim().toLowerCase());
            items.forEach(item => {
                if (calorieData[item]) {
                    totalCalories += calorieData[item];
                }
            });
        }
        return totalCalories;
    }

    const totalCalories = calculateCalories(meals);

    const userData = JSON.parse(localStorage.getItem('userData')) || {
        height: 170,
        weight: 65,
        age: 25,
    };

    const reportContainer = document.getElementById('report');
    reportContainer.innerHTML = `
        <p><strong>Name:</strong> ${userData.name || 'Guest'}</p>
        <p><strong>Age:</strong> ${userData.age}</p>
        <p><strong>Height:</strong> ${userData.height} cm</p>
        <p><strong>Weight:</strong> ${userData.weight} kg</p>
        <p><strong>Calories Consumed:</strong> ${totalCalories} kcal</p>
        <p><strong>Suggestions:</strong> Add more vegetables and protein to your diet.</p>
        <p><strong>Prediction:</strong> If you continue this diet, you may experience improved energy levels.</p>
    `;
}

// Navigate Back to Meal Tracker
function goBack() {
    window.location.href = 'tracker.html';
}
