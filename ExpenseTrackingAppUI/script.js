const mainSummary = document.getElementById(`main-summary`);

let monthlyExpensesTotal = 1000.99;
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;

mainSummary.textContent = `This month (${month}.${year}) you spent ${monthlyExpensesTotal} PLN.`

