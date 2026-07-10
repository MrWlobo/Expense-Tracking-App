// HTML Elements
const addExpenseButton = document.getElementById(`add-expense-button`);
const amountInput = document.getElementById(`amount-input`);
const categoryIdInput = document.getElementById(`category-id-input`);
const commentsInput = document.getElementById(`comments-input`);
const recentExpensesList = document.getElementById(`recent-expenses-list`);

// Modify HTML Functions
function updateRecentExpensesList(response) {
    recentExpensesList.innerHTML = "";
    for (const expense of response) {
        const newExpenseItem = document.createElement(`li`);
        newExpenseItem.textContent = `${expense.categoryName} - ${expense.amount} PLN`;
        recentExpensesList.appendChild(newExpenseItem);
    }
}

// API Functions
function addExpense (amount, categoryId, comments) {
    const body = {
        amount: amount,
        comments: comments,
        date: new Date(),
        categoryId: categoryId
    }

    return fetch(`http://localhost:8080/api/Expenses`,
        {
            method: `POST`,
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    .then(response => {
            if (response.status === 201 || response.status === 204) {
                return null; 
            }
            
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("Expense created successfully:", data);
            } else {
                console.log("Expense created successfully.");
            }
        })
        .catch(error => console.error("Error creating expense:", error));
}

function getRecentExpenses(count) {
    fetch(`http://localhost:8080/api/Expenses/recent/${count}`)
    .then(data => data.json())
    .then(response => updateRecentExpensesList(response))
    .catch(error => console.error("Error while getting recent expenses:", error));
}

// Non-Interactive Elements
let recentExpensesMaxCount = 5;

getRecentExpenses(recentExpensesMaxCount);


// Buttons
addExpenseButton.onclick = async function () {
    let amount = Number(amountInput.value);
    let categoryId = Number(categoryIdInput.value);
    let comments = commentsInput.value;

    await addExpense(amount, categoryId, comments);
    amountInput.value = "";
    categoryIdInput.value = "";
    commentsInput.value = "";
    getRecentExpenses(recentExpensesMaxCount);
}