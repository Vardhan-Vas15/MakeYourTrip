// Fetch recommendations from JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const recommendationsContainer = document.getElementById('recommendations');
        data.forEach(place => {
            const placeElement = document.createElement('div');
            placeElement.textContent = place.name;
            recommendationsContainer.appendChild(placeElement);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// Keyword searches
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.toLowerCase();
    if (keyword === 'beach' || keyword === 'beaches') {
        fetchRecommendations('beach');
    }
    // Add more conditions for other keywords (e.g., temples, countries)
});

// Fetch recommendations based on keyword
function fetchRecommendations(keyword) {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const recommendationsContainer = document.getElementById('recommendations');
            recommendationsContainer.innerHTML = ''; // Clear previous recommendations

            const filteredData = data.filter(place => place.category === keyword);
            filteredData.forEach(place => {
                const placeElement = document.createElement('div');
                const image = document.createElement('img');
                image.src = place.imageUrl;
                image.alt = place.name;
                placeElement.appendChild(image);
                const description = document.createElement('p');
                description.textContent = place.description;
                placeElement.appendChild(description);
                recommendationsContainer.appendChild(placeElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Clear recommendations
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', clearRecommendations);

function clearRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '';
}

// Display country time (optional)
function displayCountryTime(countryTimeZone) {
    const options = { timeZone: countryTimeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const countryTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${countryTimeZone}:`, countryTime);
}