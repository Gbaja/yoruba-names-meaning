console.log("load")

var input = document.getElementById("input-box");
var form = document.getElementById("formId");
var dataList = document.getElementById("datalist__auto");
var displayMeaningP = document.getElementById("result__outcome__meaning");
var displayName = document.getElementById("result__outcome__name");
var displayError = document.getElementsByClassName("wrong__outcome")[0];
var displayResult = document.getElementsByClassName("result__outcome")[0];
var dropdown = document.getElementById("dropdown-section");

var logic = {
  apiCall: function(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        console.log(xhr.responseText)
        if (xhr.responseText !== "") {
          var result = JSON.parse(xhr.responseText);
          cb(result);
          displayError.style.display = "none";
          displayResult.style.display = "block";
        } else {
          displayError.style.display = "block";
          displayResult.style.display = "none";
        }
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  },
  clearDatalist: function(element) {
    element.innerHTML = "";
  }
}

function clickable(ev) {
  input.value = ev.target.textContent;
};

function appendAList(resultsArray) {
  logic.clearDatalist(dropdown);
    resultsArray.forEach(function(name) {
      var listItem = document.createElement("li");
      listItem.textContent = name;
      listItem.className = "dropdown__list";
      listItem.addEventListener("click", clickable)
      dropdown.appendChild(listItem);
    })
    if(input.value === ""){
        logic.clearDatalist(dropdown);
    }
}

function displayMeaning(obj) {
  displayName.textContent = "Name: " + obj.name;
  displayMeaningP.textContent = "Meaning: " + obj.meaning;
}

input.addEventListener("input", function() {
  var url = "autoSearch=" + input.value;
  logic.apiCall(url, appendAList);
})

form.addEventListener("submit", function(event) {
  event.preventDefault();
  logic.clearDatalist(dropdown);
  if (input.value.length !== 0) {
    var url = "name-meaning=" + input.value;
    logic.apiCall(url, displayMeaning);
  }
  input.value = "";
})

// yoruba__modal
var whatIsYorubaModal = document.getElementById("whatIsYorubaModal");
var modalBtn = document.getElementById("modalBtn");
var closeModalBtn = document.getElementsByClassName("yoruba__modal-close")[0];

modalBtn.addEventListener("click", function() {
  whatIsYorubaModal.style.display = "block";
})

closeModalBtn.addEventListener("click", function() {
  whatIsYorubaModal.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == whatIsYorubaModal) {
    whatIsYorubaModal.style.display = "none";
  }
}
