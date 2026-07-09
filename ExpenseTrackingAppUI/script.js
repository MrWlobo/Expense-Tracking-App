// HTML Elements
const mainSummary = document.getElementById(`main-summary`);


// Modify HTML Functions
function updateMainSummary(month, year, response) {
    mainSummary.textContent = `This month (${month}.${year}) you spent ${response} PLN.`;
} 

// API Functions
function getTotalByMonth(month, year) {
    fetch(`http://localhost:8080/api/Expenses/${month}/${year}/total`)
    .then(data => data.json())
    .then(response => updateMainSummary(month, year, response))
    .catch(err => console.error("API Error:", err));
}

// -----
let currentDate = new Date();
let month = currentDate.getMonth() + 1; 
let year = currentDate.getFullYear();

getTotalByMonth(month, year);