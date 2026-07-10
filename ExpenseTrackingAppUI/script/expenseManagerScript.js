// HTML Elements
const addExpenseButton = document.getElementById(`add-expense-button`);
const amountInput = document.getElementById(`amount-input`);
const categoryIdInput = document.getElementById(`category-id-input`);
const commentsInput = document.getElementById(`comments-input`);

// API Functions
function addExpense (amount, categoryId, comments) {
    const body = {
        amount: amount,
        comments: comments,
        date: new Date(),
        categoryId: categoryId
    }

    fetch(`http://localhost:8080/api/Expenses`,
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

// Buttons
addExpenseButton.onclick = function () {
    let amount = Number(amountInput.value);
    let categoryId = Number(categoryIdInput.value);
    let comments = commentsInput.value;

    addExpense(amount, categoryId, comments);
    amountInput.value = "";
    categoryIdInput.value = "";
    commentsInput.value = "";
}