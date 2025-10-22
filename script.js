//

document
  .getElementById("changeTextButton")
  .addEventListener("click", function () {
    let paragraph = document.getElementById("myParagraph");
    paragraph.textContent = "this has changed";
  });

//

document
  .getElementById("highlightFirstCity")
  .addEventListener("click", function () {
    let Citieslist = document.getElementById("citiesList");
    Citieslist.firstElementChild.classList.add("highlight");
  });

//

document.getElementById("changeOrder").addEventListener("click", function () {
  let sp = document.getElementById("coffeeType");
  sp.textContent = "Express";
});

//
document.getElementById("addNewItem").addEventListener("click", function () {
  //create a new element
  let newItem = document.createElement("li");
  newItem.textContent = "new thing";

  let list = document.getElementById("shoppingList");
  list.appendChild(newItem);
});

//

document
  .getElementById("removeLastTask")
  .addEventListener("click", function () {
    let list = document.getElementById("taskList");
    list.lastElementChild.remove();
  });

//

document.getElementById("teaList").addEventListener("click", function (event) {
  if (event.target && event.target.matches(".teaItem")) {
    alert("You have selected : " + event.target.textContent);
  }
});

//

document
  .getElementById("feedbackForm")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let feedBack = document.getElementById("feedbackInput").value;
    console.log(feedBack);
    document.getElementById("feedbackDisplay").textContent =
      "your feedback was" + feedBack;
  });

//

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("domStatus").textContent = "DOM content loaded";
});

//

document
  .getElementById("toggleHighlight")
  .addEventListener("click", function () {
    let paraText = document.getElementById("descriptionText");
    paraText.classList.toggle("highlight");
  });
