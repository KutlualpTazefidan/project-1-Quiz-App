const addQuestionsButton = document.querySelector('[data-js="add-questions"]');
const addQuestionsButtonClick = () => {
  addQuestionsButton.classList.toggle("main__add-questions-icon-pressed");
};
addQuestionsButton.addEventListener("click", addQuestionsButtonClick);

// popup questions window according to:
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup_form

const newQuestionForm = () => {};

const bookmarkCheckbox = document.querySelector('[data-js="bookmark-button"]');
console.log(bookmarkCheckbox);

bookmarkCheckbox.addEventListener("change", function () {
  console.log(bookmarkCheckbox.checked);
});

const quizTemplate = document.querySelector(".main__quiz-card-template");
const mainSection = document.querySelector(".main-content");
let counter; // counting the number of questions
let clone; // for cloning the questions section
function newQuestion() {
  counter = (quizTemplate.datacntr || 0) + 1;
  console.log(quizTemplate.datacntr);
  quizTemplate.datacntr = counter;
  clone = quizTemplate.cloneNode(true);
  clone.className = "section" + counter;
  clone.classList.add("main__quiz-card");
  quizTemplate.parentNode.insertBefore(clone, quizTemplate);
}

// function newQuestion2() {
//   document.querySelector(".main-content").innerHTML += `
//         <section class="main__quiz-card">
//         <p class="main__questions">
//         2. What property flip the axes in the flipbox?
//         </p>
//         <button type="button" class="main__show-answer-button">
//         Show Answer
//         </button>
//         <p class="main__answers">flex-direction</p>

//         <ul class="main__question-hashtag">
//         <li>#html</li>
//         <li>#flexbox</li>
//         <li>#css</li>
//         </ul>
//         <input type="checkbox" id="bookmark" aria-label="home button control" />
//         <label class="footer__link footer__home" for="bookmark">
//         <img
//             src="./assets/bookmark.png"
//             class="main__quiz-bookmark main__empty"
//             alt="bookmark for questions"
//         />
//         <img
//             src="./assets/bookmark_filled.png"
//             class="main__quiz-bookmark main__pressed"
//             alt="pressed bookmark for questions"
//         />
//         </label>
//     </section>
//     `;
// }
