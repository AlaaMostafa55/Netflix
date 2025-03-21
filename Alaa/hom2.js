"use strict";
let urlParams = new URLSearchParams(window.location.search);
let movieId = urlParams.get("id");

if (movieId) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=43415f91158e48d163d0c8c3ec3355e2&append_to_response=videos`,
    true
  );

  xhr.onreadystatechange = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      let trailer = data.videos.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      let details = `
      ${
        trailer
          ? `<iframe  src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`
          : `<img class="notv" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="">`
      }
      
        <h1>${data.title}</h1>
        <p><strong>Release Date:</strong> ${data.release_date}</p>
        <p><strong>Rating:</strong> ${data.vote_average}/10</p>
        <p><strong>Overview:</strong> ${data.overview}</p>
      `;
      
      document.getElementById("movie-details").innerHTML = details;
    }
  };
  xhr.send();
}
