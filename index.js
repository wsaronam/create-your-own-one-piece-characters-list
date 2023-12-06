import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, remove, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
	databaseURL: "PLACEHOLDER URL - PLACE FIREBASE DB URL HERE";  // the string should be replaced with your Firebase DB URL
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const charactersListInDB = ref(database, "charactersList");


const userInputEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const charactersListEl = document.getElementById("characters-list");




onValue(charactersListInDB, function(snapshot) {
	if (snapshot.exists()) {
		let charactersArr = Object.entries(snapshot.val());
		clearCharactersListEl();
		
		for (let i = 0; i < charactersArr.length; i++) {
			let currentCharacterKey = charactersArr[i][0];
			let currentCharacterValue = charactersArr[i][1];
			addNewCharacterToList(charactersArr[i]);
		}
	}
	else {
		charactersListEl.innerHTML = "No items exist";
	}
})




addButtonEl.addEventListener("click", function() {
	push(charactersListInDB, userInputEl.value);
	clearUserInputField();
})




function addNewCharacterToList(characterEntry) {
	let characterKey = characterEntry[0];
	let characterValue = characterEntry[1];
	
	let newEL = document.createElement("li");
	
	newEl.textContent = characterValue;
	charactersListEl.append(newEl);
	
	newEl.addEventListener("dblclick", function() {
		let locationOfCharacterInDB = ref(database, `charactersList/${characterKey}`);
		remove(locationOfCharacterInDB);
	})
}

function clearUserInputField() {
	userInputEl.value = "";
}

function clearCharactersListEl() {
	charactersListEl.innerHTML = "";
}