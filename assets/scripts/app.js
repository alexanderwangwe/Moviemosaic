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

// storing the movies
const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const renderNewMovieElement = (title, imageUrl, rating) => {
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
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};
// toggle movie modal
const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

// cancle add movie handler
const cancleAddMovieHandler = () => {
  toggleMovieModal();
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
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  // push the movie object to the movies array
  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInput();
  updateUI();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
};

// backdrop click handler
const backdropClickHandler = () => {
  toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancleAddMovieButton.addEventListener("click", cancleAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
