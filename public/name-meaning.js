console.log("load")

var input = document.getElementById("input-box");
var form = document.getElementById("formId");
var dataList = document.getElementById("datalist__auto");
var displayMeaningP = document.getElementById("result__outcome__meaning");
var displayName = document.getElementById("result__outcome__name");
var displayError = document.getElementsByClassName("wrong__outcome")[0];
var displayResult = document.getElementsByClassName("result__outcome")[0];

var logic = {
  apiCall: function(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        console.log(xhr.responseText)
        if(xhr.responseText !== ""){
          var result = JSON.parse(xhr.responseText);
          cb(result);
        } else{
          displayError.style.display = "block";
          displayResult.style.display = "none";
        }
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  },
  clearDatalist: function(element){
    element.innerHTML = '';
  }
}


function outPut(obj) {
  logic.clearDatalist(dataList);
  obj.forEach(function(eachObj){
    var option = document.createElement('option');
    option.value = eachObj;
    dataList.appendChild(option)
  })
}

function displayMeaning(obj) {
  displayName.textContent = "Name: " + obj.name;
  displayMeaningP.textContent = "Meaning: " + obj.meaning;
}

input.addEventListener("input", function() {
  var url = "autoSearch=" + input.value;
  logic.apiCall(url, outPut);
})

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (input.value.length !== 0) {
    var url = "name-meaning=" + input.value;
    logic.apiCall(url, displayMeaning);
  }
  input.value = "";
})
