const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");

const backdrop = document.getElementById("backdrop");
const cancleAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancleAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const cancleAddMovieHandler = () => {
  toggleMovieModal();
};
const addMovieHandler = () =>{

}
const backdropClickHandler = () => {
    toggleMovieModal();
  };

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancleAddMovieButton.addEventListener("click", cancleAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);