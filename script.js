// Fetch recommendations from JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        recommendations = data;
        displayRecommendations(data.countries, 'country');
    })
    .catch(error => console.error('Error fetching data:', error));

// Keyword searches and display recommendations
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recommendationsContainer = document.getElementById('recommendations');

searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.toLowerCase();
    if (keyword === 'beach' || keyword === 'beaches') {
        displayRecommendations(recommendations.beaches, 'beach');
    } else if (keyword === 'temple' || keyword === 'temples') {
        displayRecommendations(recommendations.temples, 'temple');
    } else if (keyword === 'country' || keyword === 'countries') {
        displayRecommendations(recommendations.countries, 'country');
    } else {
        alert('Please enter a valid keyword (beach, temple, or country)');
    }
});

// Reset recommendations
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    displayRecommendations(recommendations.countries, 'country');
});

// Display recommendations
function displayRecommendations(data, category) {
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

        if (category === 'country') {
            const citiesContainer = document.createElement('div');
            citiesContainer.classList.add('cities');
            const citiesHeading = document.createElement('h4');
            citiesHeading.textContent = 'Cities';
            citiesContainer.appendChild(citiesHeading);
            const citiesList = document.createElement('ul');
            place.cities.forEach(city => {
                const cityItem = document.createElement('li');
                cityItem.textContent = city.name;
                citiesList.appendChild(cityItem);
            });
            citiesContainer.appendChild(citiesList);
            placeElement.appendChild(citiesContainer);
        }

        recommendationsContainer.appendChild(placeElement);
    });
}