// nanoid, creating unique short ids
// 139 years needed, in order to have a 1% probability of at least one collision.
// for production install: npm install --save nanoid
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

// Create quiz boxes
const mainContainer = document.querySelector("main");
createQuizBoxes(6);

// Add feature to reveal the answer if the "show answer button clicked"
const quizCards = document.querySelectorAll(".main__quiz-card");
quizCards.forEach((quizCard) => {
  console.log(quizCard);
  quizCard.children[2].addEventListener("click", (e) => {
    quizCard.children[3].classList.toggle("main__answers--show");
  });
});

// Function for adding quiz/question container through js.
// Advantage number of containers can be changed very fast
// html file is clean.
function createQuizBoxes(numberOfQuestions) {
  for (let i = 0; i < numberOfQuestions; i++) {
    let quizID = nanoid(6).toUpperCase();
    const quizCard = document.createElement("section");
    quizCard.classList.add("main__quiz-card");

    const quizIDField = document.createElement("p");
    quizIDField.classList.add("main__quiz-id");
    quizIDField.innerText = `Q ID: ${quizID}`;
    quizCard.append(quizIDField);

    const quizField = document.createElement("p");
    quizField.classList.add("main__questions");
    quizField.innerText = "What property flip the axes in the flipbox?";
    quizCard.append(quizField);

    const quizAnswerButton = document.createElement("button");
    quizAnswerButton.setAttribute("type", "button");
    quizAnswerButton.classList.add("main__show-answer-button");
    quizAnswerButton.innerText = "Show answer";
    quizCard.append(quizAnswerButton);

    const quizAnswerField = document.createElement("p");
    quizAnswerField.classList.add("main__answers");
    quizAnswerField.innerText = "flex direction";
    quizCard.append(quizAnswerField);

    const quizHasttags = document.createElement("ul");
    quizHasttags.classList.add("main__question-hashtag");
    quizCard.append(quizHasttags);

    const quizHasttagsItem = document.createElement("li");
    quizHasttagsItem.innerText = "#html";
    quizHasttags.append(quizHasttagsItem);
    const quizHasttagsItem2 = document.createElement("li");
    quizHasttagsItem2.innerText = "#flexbox";
    quizHasttags.append(quizHasttagsItem2);
    const quizHasttagsItem3 = document.createElement("li");
    quizHasttagsItem3.innerText = "#css";
    quizHasttags.append(quizHasttagsItem3);

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
    quizBookmarkImage.setAttribute("src", "./assets/bookmark.png");
    quizBookmarkImage.setAttribute("class", "main__quiz-bookmark main__empty");
    quizBookmarkImage.setAttribute("alt", "bookmark image for questions");
    quizBookmarkLabel.append(quizBookmarkImage);

    const quizBookmarkImagePressed = document.createElement("img");
    quizBookmarkImagePressed.setAttribute(
      "src",
      "./assets/bookmark_filled.png"
    );
    quizBookmarkImagePressed.setAttribute(
      "class",
      "main__quiz-bookmark main__pressed"
    );
    quizBookmarkImagePressed.setAttribute(
      "alt",
      "filled bookmark image for questions"
    );
    quizBookmarkLabel.append(quizBookmarkImagePressed);

    mainContainer.append(quizCard);
  }
}
