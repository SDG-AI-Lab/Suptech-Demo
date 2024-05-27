// js/updateChart.js

// URL to the CSV file hosted on GitHub Pages
const csvUrl = 'https://sdg-ai-lab.github.io/Suptech-Demo//data/demo_main_dataset.csv';

// Function to load and process CSV data
function loadCSVAndUpdateChart() {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Process platform distribution data
            const platformCounts = data.reduce((acc, row) => {
                const platform = row['post_source_type'];
                if (platform) {  // Filter out undefined values
                    if (acc[platform]) {
                        acc[platform]++;
                    } else {
                        acc[platform] = 1;
                    }
                }
                return acc;
            }, {});
            const platformLabels = Object.keys(platformCounts);
            const platformData = Object.values(platformCounts);
            updatePlatformDistributionChart(platformLabels, platformData);
        }
    });
}

// Function to update the Chart.js bar chart with real data
function updatePlatformDistributionChart(labels, data) {
    const ctx1 = document.getElementById('platformDistributionChart').getContext('2d');
    const platformDistributionChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Platform Distribution',
                data: data,
                backgroundColor: ['#2c3e50', '#18bc9c'],
                borderColor: ['#2c3e50', '#18bc9c'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadCSVAndUpdateChart();
});
