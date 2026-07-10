// HTML Elements
const addCategoryButton = document.getElementById(`add-category-button`);
const categoryNameInput = document.getElementById(`category-name-input`);
const categoriesList = document.getElementById(`categories-list`)
const spendingsByCategoryList = document.getElementById(`spendings-by-category-list`)

// HTML Modification Functions
function updateCategoriesList (response) {
    categoriesList.innerHTML = "";
    for (const category of response) {
        const newCategoryItem = document.createElement(`li`);
        newCategoryItem.textContent = `${category.id} - ${category.categoryName}`;
        categoriesList.appendChild(newCategoryItem);
    }
}

function updateSpendingsByCategoryList (response) {
    spendingsByCategoryList.innerHTML = "";
    for (const category of response) {
        const newCategoryItem = document.createElement(`li`);
        newCategoryItem.textContent = `${category.categoryName} - ${category.totalAmount} PLN`;
        spendingsByCategoryList.appendChild(newCategoryItem);
    }
}

// API Functions
function addCategory (categoryName) {
    const body = {
        categoryName: categoryName
    }

    return fetch(`http://localhost:8080/api/Categories`,
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
                console.log("Category created successfully:", data);
            } else {
                console.log("Category created successfully.");
            }
        })
        .catch(error => console.error("Error creating category:", error));
}

function getAllCategories () {
    fetch(`http://localhost:8080/api/Categories`)
    .then(data => data.json())
    .then(response => updateCategoriesList(response))
    .catch(error => console.error("Error while getting the categories:", error));
}

function getSpandingsByCategories () {
    fetch(`http://localhost:8080/api/Expenses/spendings`)
    .then(data => data.json())
    .then(response => updateSpendingsByCategoryList(response))
    .catch(error => console.error("Error while getting the spendings by category:", error));
}

// Non-Interactive Elements
getAllCategories()
getSpandingsByCategories()

// Buttons
addCategoryButton.onclick = async function () {
    let categoryName = categoryNameInput.value.trim();
    
    if (categoryName === "") {
        alert("Please enter a category name!");
        return;
    }

    await addCategory(categoryName);
    categoryNameInput.value = "";
    getAllCategories()
    getSpandingsByCategories()
}