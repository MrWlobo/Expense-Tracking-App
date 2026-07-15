// HTML Elements
const mainSummary = document.getElementById(`main-summary`);
const recentExpensesList = document.getElementById(`recent-expenses-list`);
const progressTitle = document.getElementById(`progress-title`);
const progressBar = document.getElementById(`progress-bar`);

// Modify HTML Functions
function updateMainSummary (month, year, response) {
    mainSummary.textContent = `This month (${month}.${year}) you spent ${response} PLN.`;
} 

function updateProgressBar (response) {
    progressTitle.textContent = `${response}/4000 PLN`;
    progressBar.value = response;
}

function updateRecentExpensesList (response) {
    recentExpensesList.innerHTML = "";
    for (const expense of response) {
        const newExpenseItem = document.createElement(`li`);
        newExpenseItem.textContent = `${expense.categoryName} - ${expense.amount} PLN`;
        recentExpensesList.appendChild(newExpenseItem);
    }
}

// API Functions
function getTotalByMonth (month, year) {
    fetch(`http://localhost:8080/api/Expenses/${month}/${year}/total`)
    .then(data => data.json())
    .then(response => {
        updateMainSummary(month, year, response);
        updateProgressBar(response);
    })
    .catch(error => console.error("Error while getting the total:", error));
}

function getRecentExpenses (count) {
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
