// js/generateKeywordsChart.js

// URL to the CSV file hosted on GitHub Pages
const keywordsCsvUrl = 'https://sdg-ai-lab.github.io/Suptech-Demo//data/demo_main_dataset.csv';

// List of common stopwords
const stopwords = ["service services", "n't think", "not cut", "name tasarruf", "already been", "society âtma", "âtma publicatessarruf âtma", "â€tms departure", "no one", "âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms âtms", "n't want", "n't have", "n't know", 'not be','right', 'good', 'a lot', 'years', 'all right', 'https','the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water', 'been', 'call', 'who', 'oil', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'];

// Function to load and process CSV data for keywords
function loadCSVAndGenerateKeywordsChart() {
    Papa.parse(keywordsCsvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Process keywords data
            const keywordCounts = data.reduce((acc, row) => {
                if (row['post_keywords']) {
                    // Remove the leading and trailing brackets and split by comma
                    const keywords = row['post_keywords'].slice(1, -1).split(',');
                    keywords.forEach(keyword => {
                        // Remove any extra quotes and whitespace
                        keyword = keyword.trim().replace(/^["']|["']$/g, '').toLowerCase();
                        // Remove 'the' at the beginning of the keyword
                        if (keyword.startsWith('the ')) {
                            keyword = keyword.slice(4);
                        }
                        if (keyword.startsWith('a ')) {
                            keyword = keyword.slice(2);
                        }
                        // Remove stopwords
                        if (!stopwords.includes(keyword) && keyword && keyword.split(' ').length > 1) {
                            if (acc[keyword]) {
                                acc[keyword]++;
                            } else {
                                acc[keyword] = 1;
                            }
                        }
                    });
                }
                return acc;
            }, {});
            
            const sortedKeywords = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]).slice(0, 25);
            const keywordLabels = sortedKeywords.map(entry => entry[0]);
            const keywordData = sortedKeywords.map(entry => entry[1]);
            console.log(keywordLabels);  // Add this line
            generateKeywordsChart(keywordLabels, keywordData);
        }
    });
}

// Function to generate the horizontal bar chart
function generateKeywordsChart(labels, data) {
    const ctx = document.getElementById('keywordsChart').getContext('2d');
    const keywordsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Most Frequent Keywords',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // This makes the bar chart horizontal
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadCSVAndGenerateKeywordsChart();
});