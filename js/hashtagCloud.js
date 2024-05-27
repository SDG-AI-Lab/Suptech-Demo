// js/generateWordCloud.js

// URL to the CSV file hosted on GitHub Pages
const wordCloudCsvUrl = 'https://sdg-ai-lab.github.io/Suptech-Demo//data/demo_main_dataset.csv';

// Function to load and process CSV data for word cloud
function loadCSVAndGenerateWordCloud() {
    Papa.parse(wordCloudCsvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Process hashtag data
            const excludedHashtags = ['kamudatasarruf', 'memurhakkınıalamıyor', 'tasarruftedbirleri', 'verimlilikpaketi'];
            const hashtagCounts = data.reduce((acc, row) => {
                if (row['post_hashtags']) {
                    const hashtags = row['post_hashtags'].split(',');
                    const count = parseInt(row['matched_ids'], 10) || 0;
                    hashtags.forEach(hashtag => {
                        if (hashtag && !excludedHashtags.includes(hashtag.trim())) {
                            if (acc[hashtag]) {
                                acc[hashtag] += count;
                            } else {
                                acc[hashtag] = count;
                            }
                        }
                    });
                }
                return acc;
            }, {});

            const wordCloudData = Object.entries(hashtagCounts).map(([text, size]) => [text, size]);
            generateWordCloud(wordCloudData);
        }
    });
}

// Function to generate the word cloud
function generateWordCloud(data) {
    WordCloud(document.getElementById('wordcloud'), {
        list: data,
        gridSize: Math.round(16 * document.getElementById('wordcloud').offsetWidth / 1024),
        weightFactor: function (size) {
            return Math.pow(size, 1.5) * document.getElementById('wordcloud').offsetWidth / 1024;
        },
        fontFamily: 'Times, serif',
        color: function (word, weight) {
            return (weight === 12) ? '#f02222' : '#c09292';
        },
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: '#ffe0e0'
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadCSVAndGenerateWordCloud();
});
