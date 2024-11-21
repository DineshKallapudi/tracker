let foods = []; // Will be loaded from CSV
let totalCalories = 0;
const recommendedCalories = 2000;

// Function to load CSV and parse it into the foods array
async function loadFoods() {
    const response = await fetch('foods.csv');
    const data = await response.text();
    const rows = data.trim().split('\n');
    rows.shift(); // Remove the header row

    foods = rows.map(row => {
        const [name, calories, protein, carbs, fat, fiber] = row.split(',');
        return {
            name,
            calories: parseInt(calories),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fat: parseFloat(fat),
            fiber: parseFloat(fiber),
        };
    });

    displayFoods();
}

// Function to display all predefined food items
function displayFoods() {
    const dishList = document.getElementById('dish-list');
    dishList.innerHTML = ''; // Clear existing food list

    foods.forEach(food => {
        const dishItem = document.createElement('div');
        dishItem.className = 'dish-item';
        dishItem.textContent = food.name;
        dishItem.onclick = () => showFoodDetails(food);
        dishList.appendChild(dishItem);
    });
}

// Function to show the nutrition details of a selected food
function showFoodDetails(food) {
    document.getElementById('nutrition-info').style.display = 'block';
    document.getElementById('item-name').textContent = food.name;
    document.getElementById('item-calories').textContent = food.calories;
    document.getElementById('item-protein').textContent = food.protein;
    document.getElementById('item-carbs').textContent = food.carbs;
    document.getElementById('item-fat').textContent = food.fat;
    document.getElementById('item-fiber').textContent = food.fiber;
}

// Function to add the selected food to the total calories
function addFoodToGoal() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const calories = parseInt(document.getElementById('item-calories').textContent) || 0;

    totalCalories += calories * quantity; // Add calories multiplied by quantity
    updateCalorieCounter();
}

// Function to update the calorie counter and progress bar
function updateCalorieCounter() {
    document.getElementById('total-calories').textContent = totalCalories;

    const caloriePercentage = Math.min((totalCalories / recommendedCalories) * 100, 100);
    const progressBar = document.getElementById('calories-bar').firstElementChild;

    // Update progress bar width
    progressBar.style.width = `${caloriePercentage}%`;

    // Update progress bar color
    if (caloriePercentage <= 60) {
        progressBar.style.backgroundColor = '#32CD32'; // Green
    } else if (caloriePercentage <= 90) {
        progressBar.style.backgroundColor = '#FFA500'; // Orange
    } else {
        progressBar.style.backgroundColor = '#FF4500'; // Red
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFoods(); // Load foods from CSV
    document.getElementById('add-to-goal').addEventListener('click', addFoodToGoal);
});
