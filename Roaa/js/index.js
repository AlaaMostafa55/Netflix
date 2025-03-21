
//lang
      function openArabic() {
        window.location.replace("./Roaa/index-ar.html");
    }
    function openEnglish() {
        window.location.replace("../index.html");
    }

//LOGIN & REGISTER

function openlogin() {
    window.location.assign("../../Aza/login.html" );
}
function openregister() {
    window.location.assign("../../Aza/login.html");
}
//API OF MOVIES
const API_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=43415f91158e48d163d0c8c3ec3355e2';

const sliderContainer = document.querySelector('.movie-slider');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const modal = document.getElementById('movieModal');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalOverview = document.getElementById('modalOverview');
const modalReleaseDate = document.getElementById('modalReleaseDate');
const closeModal = document.querySelector('.close');

async function fetchMovies() {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayMovies(data.results);
}

//Display Movies In The slider
function displayMovies(movies) {
    nextButton.addEventListener('click', function() {
        sliderContainer.scrollBy({ left:600});
    });
    
    prevButton.addEventListener('click', function()  {
        sliderContainer.scrollBy({ left: -600});
    });
    movies.forEach(function(movie)  {
        const card = document.createElement('div');
        card.classList.add('card');

        const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const movieTitle = movie.title;
        const movieOverview = movie.overview;
        const movieReleaseDate = movie.release_date;

        card.innerHTML = `
            <img src="${moviePoster}" alt="${movieTitle}">
            <span>${movieTitle}</span>
        `;


        
        card.addEventListener('click', function() {
            openModal(moviePoster, movieTitle, movieOverview, movieReleaseDate);
        });


        sliderContainer.appendChild(card);
    });
}

//Display Movies Info

function openModal(poster, title, overview, releaseDate) {
    modalPoster.src = poster;
    modalTitle.textContent = title;
    modalOverview.textContent = overview || "No overview available.";
    modalReleaseDate.textContent = releaseDate || "Unknown";

    modal.style.display = 'flex'; 
}

closeModal.addEventListener('click', function()  {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

fetchMovies();

//Q & A Section
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function(item) {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function(){
      faqItems.forEach(function(item)  {
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".toggle-icon");
        answer.style.display = "none";
        icon.textContent = "+";
      });

      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".toggle-icon");
      if (answer.style.display === "none" || !answer.style.display) {
        answer.style.display = "block";
        icon.textContent = "-";
      }
    });
  });

      