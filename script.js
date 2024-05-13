// Fetch recommendations from JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        recommendations = data;
        displayRecommendations(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Keyword searches and display recommendations
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recommendationsContainer = document.getElementById('recommendations');

searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.toLowerCase();
    if (keyword === 'beach' || keyword === 'beaches') {
        displayRecommendations(recommendations.filter(place => place.category === 'beach'));
    } else if (keyword === 'temple' || keyword === 'temples') {
        displayRecommendations(recommendations.filter(place => place.category === 'temple'));
    } else if (keyword === 'country' || keyword === 'countries') {
        displayRecommendations(recommendations.filter(place => place.category === 'country'));
    } else {
        alert('Please enter a valid keyword (beach, temple, or country)');
    }
});

// Reset recommendations
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    displayRecommendations(recommendations);
});

// Display recommendations
function displayRecommendations(data) {
    recommendationsContainer.innerHTML = '';
    data.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.classList.add('recommendation');
        const image = document.createElement('img');
        image.src = place.imageUrl;
        image.alt = place.name;
        placeElement.appendChild(image);
        const name = document.createElement('h3');
        name.textContent = place.name;
        placeElement.appendChild(name);
        const description = document.createElement('p');
        description.textContent = place.description;
        placeElement.appendChild(description);
        recommendationsContainer.appendChild(placeElement);
    });
}