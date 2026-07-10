// HTML Elements
const addCategoryButton = document.getElementById(`add-category-button`);
const categoryNameInput = document.getElementById(`category-name-input`);

// API Functions
function addCategory (categoryName) {
    const body = {
        categoryName: categoryName
    }

    fetch(`http://localhost:8080/api/Categories`,
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

// Buttons
addCategoryButton.onclick = function () {
    let categoryName = categoryNameInput.value.trim();
    
    if (categoryName === "") {
        alert("Please enter a category name!");
        return;
    }

    addCategory(categoryName);
    categoryNameInput.value = "";
}