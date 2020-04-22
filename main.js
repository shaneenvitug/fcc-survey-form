//Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyC1SpE2-piRfHSKTwjYPA0_7gE-7nEFuC4",
  authDomain: "survey-form-fcc.firebaseapp.com",
  databaseURL: "https://survey-form-fcc.firebaseio.com",
  projectId: "survey-form-fcc",
  storageBucket: "survey-form-fcc.appspot.com",
  messagingSenderId: "400485441927",
  appId: "1:400485441927:web:a9c7b189840ad6b82c3322",
  measurementId: "G-8M8HNYWBRH"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

console.log("firebase.database()", firebase.database())

//Reference for form collection(3)
let formMessage = firebase.database().ref();

//listen for submit event//
document.getElementById('survey-form').addEventListener('submit', formSubmit);

//Submit form
function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let age = document.querySelector("#number").value;
  let gender = document.getElementsByName("gender")[0].checked? 'male' : 'female';
  let countryList = document.getElementById("dropdown");
  let countryValue = countryList.options[countryList.selectedIndex].value;
  let goals = Array.from(document.getElementsByName("goals")).filter(a => a.checked).map(a => a.value)
  let microGoals = document.querySelector("#micro-goals").value;
  let hindrances = Array.from(document.getElementsByName("hindrances")).filter(a => a.checked).map(a => a.value)
  let motivations = Array.from(document.getElementsByName("motivations")).filter(a => a.checked).map(a => a.value)
  let exercises = Array.from(document.getElementsByName("exercises")).filter(a => a.checked).map(a => a.value)
  let frequency = document.querySelector("input[name=often-workout]:checked").value;
  let currentWellness = document.querySelector("input[name=current-wellness]:checked").value;
  let seriousGoals = document.querySelector("input[name=serious-goals]:checked").value;

  //send message values
  sendMessage(name, email, age, gender, countryValue, goals, microGoals, hindrances, motivations, exercises, frequency, currentWellness, seriousGoals);

  //Show Alert Message
  document.querySelector(".alert-message").style.display = "block";

  //Hide Alert Message After Seven Seconds
  setTimeout(function() {document.querySelector(".alert-message").style.display = "none";
  }, 7000);

  //Form Reset After Submission
  document.getElementById('survey-form').reset();
}

//Send Message to Firebase(4)
function sendMessage(name, email, age, gender, countryValue, goals, microGoals, hindrances, motivations, exercises, frequency, currentWellness, seriousGoals) {
  console.log({name, email, age, gender, countryValue, goals, microGoals, hindrances, motivations, exercises, frequency, currentWellness, seriousGoals})
  let newFormMessage = formMessage.push();
  newFormMessage.set({
    name: name,
    email: email,
    age: age,
    gender: gender,
    countryValue: countryValue,
    goals: goals,
    microGoals: microGoals,
    hindrances: hindrances,
    motivations: motivations,
    exercises: exercises,
    frequency: frequency,
    currentWellness: currentWellness,
    seriousGoals: seriousGoals
  });
}
//limit checkbox selection to 3 for top 3 goals
var checks = document.querySelectorAll(".top3");
var max = 3;
for (let i = 0; i < checks.length; i++)
  checks[i].onclick = selectiveCheck;
function selectiveCheck (event) {
  var checkedChecks = document.querySelectorAll(".top3:checked");
  if (checkedChecks.length >= max + 1)
    return false;
}
