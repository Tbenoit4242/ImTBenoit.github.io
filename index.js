
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});


function fetchData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((resp) => resp.json())
        .then((data) => {
            displayDrinks(data.drinks);  
        });
    
}


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const drinkList = document.getElementById('drinkList');
const drinkDetail = document.getElementById('drinkDetail');
const viewedHistory = document.getElementById('viewedHistory');
const clearHistoryButton = document.getElementById('clearHistoryButton');


let viewedDrinks = [];


function performSearch() {
    const searchTerm = searchInput.value.toLowerCase(); 
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`) 
        .then((resp) => resp.json())
        .then((data) => {
            if (data.drinks) {
                displayDrinks(data.drinks);  
            } else {
                drinkList.innerHTML = '<p>No drinks found</p>';  
            }
        });
}


searchButton.addEventListener('click', performSearch);


searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});


clearHistoryButton.addEventListener('click', () => {
    viewedDrinks = [];  
    updateViewedHistory();  
});


function displayDrinks(drinks) {
    drinkList.innerHTML = '';  
    drinks.forEach(drink => {
        const drinkCard = document.createElement('div'); 
        drinkCard.classList.add('drink-card');  
        drinkCard.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        drinkCard.addEventListener('click', () => {
            displayDrinkDetail(drink);  
            addToViewedHistory(drink); 
        });
        drinkList.appendChild(drinkCard);  
    });
}


function displayDrinkDetail(drink) {
    drinkDetail.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
            ${getIngredientsList(drink)}
        </ul>
    `;
   
}


function getIngredientsList(drink) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {  
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li>${measure ? measure : ''} ${ingredient}</li>`;
        }
    }
    return ingredients; 
}


function addToViewedHistory(drink) {
    if (!viewedDrinks.some(d => d.idDrink === drink.idDrink)) {
        viewedDrinks.push(drink);  
        updateViewedHistory(); 
    }
}


function updateViewedHistory() {
    viewedHistory.innerHTML = '';  
    viewedDrinks.forEach(drink => {
        const historyCard = document.createElement('div'); 
        historyCard.classList.add('history-card');  
        historyCard.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        historyCard.addEventListener('click', () => displayDrinkDetail(drink));  
        viewedHistory.appendChild(historyCard);  
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment');
    const commentList = document.createElement('ul'); // Create a list to display comments

    // Append the comment list to the body or a specific section of your page
    document.body.appendChild(commentList);

    // Handle form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const commentText = commentInput.value.trim(); // Get the comment text and remove extra spaces

        if (commentText !== '') {
            addComment(commentText); // Call the function to add the comment    
            commentInput.value = ''; // Clear the input field after submission
        }
    });
})