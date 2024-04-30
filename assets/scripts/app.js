const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
// enable toggling the backdrop
const backdrop = document.getElementById("backdrop");
// enable toggling the movie modal
const cancleAddMovieButton = addMovieModal.querySelector(".btn--passive");
// enable adding movie
const confirmAddMovieButton = cancleAddMovieButton.nextElementSibling;
// enable user inputs
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

// storing the movies
const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
};

const closeMovieDeletionModal = () => {
  deleteMovieModal.classList.remove("visible");
  toggleBackdrop();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  const cancleDeletionButton = deleteMovieModal.querySelector(".btn--danger");
  const confirmDeletionButton = deleteMovieModal.querySelector(".btn--passive");

  cancleDeletionButton.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
          <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
          </div>
          <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
          </div>
        `;
  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  );

  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

// toggle movie modal
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

// cancle add movie handler
const cancleAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
};

// add movie handler
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  // check if the input is valid
  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }
  // create a movie object
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  // push the movie object to the movies array
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
};

// backdrop click handler
const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancleAddMovieButton.addEventListener("click", cancleAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
