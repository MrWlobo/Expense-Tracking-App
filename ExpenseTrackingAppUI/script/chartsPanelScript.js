// HTML Elements
const ctx = document.getElementById('chart').getContext('2d');
const lineChartButton = document.getElementById('line-chart-button');
const barChartButton = document.getElementById('bar-chart-button');
const pieChartButton = document.getElementById('pie-chart-button');
const yearSelector = document.getElementById('year-selector');
let currentChart = null;

// Render Charts
function destroyActiveChart() {
    if (currentChart) {
        currentChart.destroy();
    }
}

function renderBarChart(categories, amounts) {
    destroyActiveChart();
    
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: [
                    'rgba(238, 217, 252, 0.6)', 
                    'rgba(180, 140, 210, 0.6)', 
                    'rgba(120, 90, 160, 0.6)', 
                    'rgba(80, 50, 110, 0.6)'
                ],
                borderColor: '#eed9fc',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(238, 217, 252, 0.1)' }, ticks: { color: '#eed9fc' } },
                y: { grid: { color: 'rgba(238, 217, 252, 0.1)' }, ticks: { color: '#eed9fc' } }
            }
        }
    });
}

function renderLineChart(months, datasets) {
    destroyActiveChart();

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(238, 217, 252, 0.1)' }, ticks: { color: '#eed9fc' } },
                y: { grid: { color: 'rgba(238, 217, 252, 0.1)' }, ticks: { color: '#eed9fc' } }
            }
        }
    });
}

// API Functions
function loadCategorySpendings() {
    fetch('http://localhost:8080/api/Expenses/spendings')
    .then(res => res.json())
    .then(response => {
        const categories = response.map(item => item.categoryName);
        const amounts = response.map(item => item.totalAmount);
        renderBarChart(categories, amounts);
    })
    .catch(error => console.error(error));
}

const colors = ['#eed9fc', '#b48cd2', '#785aa0', '#50326e'];

function loadMonthlyTrends(year = yearSelector.value) {
    fetch(`http://localhost:8080/api/Expenses/monthly/${year}`)
    .then(res => res.json())
    .then(response => {
        const months = [...new Set(response.map(item => item.month))];
        const categories = [...new Set(response.map(item => item.categoryName))];

        const datasets = categories.map((category, index) => {
            const dataPoints = months.map(month => {
                const record = response.find(item => item.month === month && item.categoryName === category);
                return record ? record.totalAmount : 0;
            });

            return {
                label: category,
                data: dataPoints,
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length],
                tension: 0.3,
                fill: false
            };
        });

        renderLineChart(months, datasets);
    })
    .catch(error => console.error(error));
}

// Year Selector
yearSelector.value = new Date().getFullYear();
yearSelector.addEventListener('change', (event) => {
    loadMonthlyTrends(event.target.value);
});

yearSelector.addEventListener('keydown', (event) => {
    event.preventDefault();
});

yearSelector.addEventListener('paste', (event) => {
    event.preventDefault();
});

yearSelector.addEventListener('drop', (event) => {
    event.preventDefault();
});


// Buttons
lineChartButton.onclick = function () {
    loadMonthlyTrends();
}

barChartButton.onclick = function () {
    loadCategorySpendings();
}


loadMonthlyTrends();