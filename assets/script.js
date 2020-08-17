//Array of uppercase 
var upperArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Array of lowercase
var lowerArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//Array of special characters
var specialArray = ["!", "#", "%", "&", "(", ")", "[", "]", "{", "}", ".", ";", ":", "*", "-", "+", "/", "=", "\\", "?","'","~","_"];

//Array of numbers
var numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//Array we will put avaialbe characters for our password 
var optionArray = [];

//Array we will pull a in 1 requiried character for each type
var reqArray = [];

//Array we will put our password result in 
var resultArray = [];

document.getElementById('password').innerHTML = "";  


function pwLength(){
  //clear arrays 
  optionArray = [];
  reqArray = [];
  resultArray = [];
  var charLength = ("");

  //ask the user what the lenght of the passwoord is supposed to be.
  charLength = window.prompt ("How many characters would you like your password to be?");
  charLength = parseInt(charLength)
  console.log ("Your password will be " + charLength + " characters long.");
  //validate that the user chose an optioin wiithin the 8 and 128.
  if (charLength > 7 && charLength < 129 && charLength != NaN){
    //prompt next function and pass the length from teh window.prompt forward. 
    return setCriteria(charLength)
  } 
  else {
    window.alert("Please choose an option between 8 and 128.");
    pwLength();
  }
}

function setCriteria(charLength){

  //ask user what characters to include in PW.
  var upperAllow = window.confirm ("Would you like to use Uppercase letters in your password?");
    console.log ("Use Uppercase " +  upperAllow);
  
  var lowerAllow = window.confirm ("Would you like to use lowercase letters in your password?");
  console.log ("Use Lowercase " + lowerAllow);
  
  var specialAllow = window.confirm("would you like to use special characters in your password?");
  console.log ("Use special characters " + specialAllow);
  
  var numAllow = window.confirm ("Would you like to use numbers in your password?");
  console.log ("Use numbers " + numAllow);

  //make sure the user chooses at least one type of character
  if(upperAllow === false && lowerAllow === false && specialAllow === false && numAllow === false){
    window.alert ("Please choose at least one character type.");
    //if the user does not choose an option kick them out and force them to start over.
    return ;
  }
  else{
    //build an object with the data from my window.confirm questions
    var userChoices = {
      charLength: charLength,
      upperAllow: upperAllow,
      lowerAllow: lowerAllow,
      specialAllow: specialAllow,
      numAllow: numAllow
    };

    console.log (userChoices) 
    //prompt next function to run and pass user choices to the next fuction
    return generatePassword(userChoices)
  }
}
function generatePassword(userChoices) {

  //pick one chracter at random from each array.
  var upperReq = Math.floor(Math.random()*upperArray.length);
  var lowerReq = Math.floor(Math.random()*lowerArray.length);
  var sepcialReq = Math.floor(Math.random()*specialArray.length);
  var numReq = Math.floor(Math.random()*numArray.length);

  //build the optionaArray based on the answers from the window.confirm
  if (userChoices.upperAllow === true) {
    optionArray.push(upperArray);
  }
  if (userChoices.lowerAllow === true) {
    optionArray.push(lowerArray);
  }
  if (userChoices.specialAllow === true) {
    optionArray.push(specialArray);
  }
  if (userChoices.numAllow  === true) {
    optionArray.push(numArray);
  }
  console.log(optionArray);

  //put one option in the reqArray for each of the character types the user selects.
  if (userChoices.upperAllow === true) {
    reqArray.push(upperArray [upperReq]);
  }
  if (userChoices.lowerAllow === true) {
    reqArray.push(lowerArray [lowerReq]);
  }
  if (userChoices.specialAllow === true) {
    reqArray.push(specialArray [sepcialReq]);
  }
  if (userChoices.numAllow  === true) {
    reqArray.push(numArray[numReq]);
  }
  console.log (reqArray)

  //prompt th enext function ans pass the user choices forward.
  return setPassword(userChoices)
}


//Create Function
function setPassword(userChoices) {
  //for loop uuused to generate PW
  for (var i=0; i < userChoices.charLength; i++){
    var firstIndex = Math.floor(Math.random()*optionArray.length);
    //console.log (firstIndex);
    var secondIndex = Math.floor(Math.random()*optionArray[firstIndex].length);
    // console.log (secondIndex);
    //console.log(optionArray[firstIndex][secondIndex])
    resultArray.push(optionArray[firstIndex][secondIndex])
  }
  // console.log(resultArray)

  //incluude at least one of each guaranteed characters
    for (var i = 0; i < reqArray.length; i++){
      resultArray[i] = reqArray[i];
      // console.log (resultArray[i], reqArray[i]);
  }
  //return as a string
  return resultArray
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  pwLength();
  var password = resultArray.join('')
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate buttons
generateBtn.addEventListener("click", writePassword);

//execute Functioin
//generatePassword() 