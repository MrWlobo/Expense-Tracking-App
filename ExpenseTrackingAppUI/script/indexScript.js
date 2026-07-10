// HTML Elements
const mainSummary = document.getElementById(`main-summary`);
const recentExpensesList = document.getElementById(`recent-expenses-list`);

// Modify HTML Functions
function updateMainSummary(month, year, response) {
    mainSummary.textContent = `This month (${month}.${year}) you spent ${response} PLN.`;
} 

function updateRecentExpensesList(response) {
    recentExpensesList.innerHTML = "";
    for (const expense of response) {
        const newExpenseItem = document.createElement(`li`);
        newExpenseItem.textContent = `${expense.categoryName} - ${expense.amount} PLN`;
        recentExpensesList.appendChild(newExpenseItem);
    }
}

// API Functions
function getTotalByMonth(month, year) {
    fetch(`http://localhost:8080/api/Expenses/${month}/${year}/total`)
    .then(data => data.json())
    .then(response => updateMainSummary(month, year, response))
    .catch(error => console.error("Error while getting the total:", error));
}

function getRecentExpenses(count) {
    fetch(`http://localhost:8080/api/Expenses/recent/${count}`)
    .then(data => data.json())
    .then(response => updateRecentExpensesList(response))
    .catch(error => console.error("Error while getting recent expenses:", error));
}

// Non-Interactive Elements
let currentDate = new Date();
let month = currentDate.getMonth() + 1; 
let year = currentDate.getFullYear();
let recentExpensesMaxCount = 5;

getTotalByMonth(month, year);
getRecentExpenses(recentExpensesMaxCount);
