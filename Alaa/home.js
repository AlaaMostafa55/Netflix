"use strict";

function api(id, category) {
  let myHttp = new XMLHttpRequest();
  let allMovs = [];
  myHttp.open(
    "GET",
    `https://api.themoviedb.org/3/discover/movie?api_key=43415f91158e48d163d0c8c3ec3355e2&with_genres=${id}&sort_by=popularity.desc`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState === 4 && myHttp.status === 200) {
      allMovs = JSON.parse(myHttp.response).results;
      display();
    }
  });

  function display() {
    let container = document.createElement("div");
    container.innerHTML = `
      <div id="control">
        <h2 id="${category}" class="h2">${category}</h2>
        <button class="prev-btn">❮</button>
        <button class="next-btn">❯</button>
      </div>
      <div class="category">
        <div class="movies">
          ${allMovs
            .map(
              (movie) => `
            <div class="movie" data-id="${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt=""></div>`
            )
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("imgrwo").appendChild(container);

    let nextButton = container.querySelector(".next-btn");
    let prevButton = container.querySelector(".prev-btn");
    let sliderContainer = container.querySelector(".category");

    if (nextButton && prevButton && sliderContainer) {
      nextButton.addEventListener("click", function () {
        sliderContainer.scrollBy({ left: 500, behavior: "smooth" });
      });

      prevButton.addEventListener("click", function () {
        sliderContainer.scrollBy({ left: -500, behavior: "smooth" });
      });
    }

    let movies = container.querySelectorAll(".movie");
    movies.forEach((movie) => {
      movie.addEventListener("click", function () {
        let movieId = this.getAttribute("data-id");
        window.open(`movie.html?id=${movieId}`, "_blank");
      });
    });
  }
}

api(28, "Action");
api(35, "Comedy");
api(18, "Drama");
api(27, "Horror");
api(878, "Science Fiction");
api(16, "Animation");

let swi = document.getElementById("switch");

window.localStorage.setItem("black", "black");
window.localStorage.setItem("white", "white");

document.body.style.backgroundColor = window.localStorage.getItem("black");
document.body.style.color = window.localStorage.getItem("white");

swi.addEventListener("click", () => {
  if (
    document.body.style.backgroundColor === window.localStorage.getItem("white")
  ) {
    document.body.style.backgroundColor = window.localStorage.getItem("black");
    document.body.style.color = window.localStorage.getItem("white");
  } else {
    document.body.style.backgroundColor = window.localStorage.getItem("white");
    document.body.style.color = window.localStorage.getItem("black");
  }
});
