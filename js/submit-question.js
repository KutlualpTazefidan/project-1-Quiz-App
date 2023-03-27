// nanoid, creating unique short ids
// 139 years needed, in order to have a 1% probability of at least one collision.
// for production install: npm install --save nanoid
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

const submitQuizForm = document.querySelector('[data-js="form"]');
const mainContainer = document.querySelector(".main");
const fieldContainer = document.querySelectorAll(".form__field");
const numberOfLeftLetterContainer = document.querySelectorAll(
  ".form__number-of-letters-left"
);

// Count the number of letters left to use in the submit fields
let lengthOfQuestion = 0;
let lengthOfAnswer = 0;
let maxLength = 150;
for (let i = 0; i < fieldContainer.length - 1; i++) {
  const inputText = fieldContainer[i];
  fieldContainer[i].addEventListener("input", (e) => {
    if (inputText.getAttribute("name") === "formQuestion") {
      lengthOfQuestion = fieldContainer[i].value.length;
      numberOfLeftLetterContainer[i].innerText =
        calculateNumberOfCharactersLeft(maxLength, lengthOfQuestion);
    } else {
      lengthOfAnswer = fieldContainer[i].value.length;
      numberOfLeftLetterContainer[i].innerText =
        calculateNumberOfCharactersLeft(maxLength, lengthOfAnswer);
    }
  });
}

function calculateNumberOfCharactersLeft(maxLength, lengthOfText) {
  return `${maxLength - lengthOfText} characters left`;
}

// Submit event -> 1. to catch the form data 2. to create a quiz card for it
submitQuizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(submitQuizForm);
  console.log(formData);
  const formDataEntries = Object.fromEntries(formData);
  e.target.reset();
  submitQuizForm.formQuestion.focus();
  submitQuizBoxes(mainContainer, formDataEntries);

  const quizCards = document.querySelectorAll(".main__quiz-card");
  quizCards.forEach((quizCard) => {
    console.log(quizCard);
    quizCard.children[2].addEventListener("click", (e) => {
      quizCard.children[3].classList.toggle("main__answers--show");
    });
  });
});

// Function for creating quiz boxes
// Also used in index.js -> export the function?
function submitQuizBoxes(quizContainer, formDataEntries) {
  console.log(formDataEntries.formQuestion);
  console.log(formDataEntries.formAnswer);
  console.log(formDataEntries.formTag);
  let quizID = nanoid(6).toUpperCase();
  const quizCard = document.createElement("section");
  quizCard.classList.add("main__quiz-card");

  const quizIDField = document.createElement("p");
  quizIDField.classList.add("main__quiz-id");
  quizIDField.innerText = `Q ID: ${quizID}`;
  quizCard.append(quizIDField);

  const quizField = document.createElement("p");
  quizField.classList.add("main__questions");
  quizField.innerText = `${formDataEntries.formQuestion}`;
  quizCard.append(quizField);

  const quizAnswerButton = document.createElement("button");
  quizAnswerButton.setAttribute("type", "button");
  quizAnswerButton.classList.add("main__show-answer-button");
  quizAnswerButton.innerText = "Show answer";
  quizCard.append(quizAnswerButton);

  const quizAnswerField = document.createElement("p");
  quizAnswerField.classList.add("main__answers");
  quizAnswerField.innerText = `${formDataEntries.formAnswer}`;
  quizCard.append(quizAnswerField);

  const quizHasttags = document.createElement("ul");
  quizHasttags.classList.add("main__question-hashtag");
  quizCard.append(quizHasttags);

  const quizHasttagsItem = document.createElement("li");
  quizHasttagsItem.innerText = `# ${formDataEntries.formTag}`;
  quizHasttags.append(quizHasttagsItem);

  const quizBookmarkButton = document.createElement("input");
  quizBookmarkButton.setAttribute("type", "checkbox");
  quizBookmarkButton.setAttribute("id", "bookmark");
  quizBookmarkButton.setAttribute("class", "main__quiz-bookmark");
  quizBookmarkButton.setAttribute("aria-label", "bookmark button");
  quizCard.append(quizBookmarkButton);

  const quizBookmarkLabel = document.createElement("label");
  quizBookmarkLabel.setAttribute("class", "main__quiz-bookmark");
  quizBookmarkLabel.setAttribute("for", "bookmark");
  quizCard.append(quizBookmarkLabel);

  const quizBookmarkImage = document.createElement("img");
  quizBookmarkImage.setAttribute("src", "../assets/bookmark.png");
  quizBookmarkImage.setAttribute("class", "main__quiz-bookmark main__empty");
  quizBookmarkImage.setAttribute("alt", "bookmark image for questions");
  quizBookmarkLabel.append(quizBookmarkImage);

  const quizBookmarkImagePressed = document.createElement("img");
  quizBookmarkImagePressed.setAttribute("src", "../assets/bookmark_filled.png");
  quizBookmarkImagePressed.setAttribute(
    "class",
    "main__quiz-bookmark main__pressed"
  );
  quizBookmarkImagePressed.setAttribute(
    "alt",
    "filled bookmark image for questions"
  );
  quizBookmarkLabel.append(quizBookmarkImagePressed);

  quizContainer.append(quizCard);
}
