// js/updateSentimentChart.js

// URL to the CSV file hosted on GitHub Pages
const sentimentCsvUrl = 'https://sdg-ai-lab.github.io/Suptech-Demo//data/demo_main_dataset.csv';

// Function to load and process CSV data for sentiment distribution
function loadCSVAndUpdateSentimentChart() {
    Papa.parse(sentimentCsvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Process sentiment distribution data
            const sentimentCounts = data.reduce((acc, row) => {
                const sentiment = row['post_sentiment'];
                if (sentiment) {  // Filter out undefined values
                    if (acc[sentiment]) {
                        acc[sentiment]++;
                    } else {
                        acc[sentiment] = 1;
                    }
                }
                return acc;
            }, {});

            const sentimentLabels = Object.keys(sentimentCounts);
            const sentimentData = Object.values(sentimentCounts);
            updateSentimentDistributionChart(sentimentLabels, sentimentData);
        }
    });
}

// Function to update the Chart.js pie chart with real data
function updateSentimentDistributionChart(labels, data) {
    const ctx2 = document.getElementById('sentimentChart').getContext('2d');
    const sentimentChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sentiment Distribution',
                data: data,
                backgroundColor: ['gray', 'green', 'red'],
                borderWidth: 1
            }]
        }
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadCSVAndUpdateSentimentChart();
});
