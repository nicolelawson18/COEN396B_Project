function validateYear() {
  var yearInput = document.getElementById('yearInput').value;
  var errorText = document.getElementById('errorText');

  // Check if the input is a valid integer between 1995 and 2018
  var year = parseInt(yearInput);
  if (isNaN(year) || year < 1995 || year > 2018) {
    errorText.textContent = 'Invalid year! Please enter an integer between 1995 and 2018.';
    return;
  }

  errorText.textContent = ''; // Clear any previous error message

  // Call the function from another JavaScript file
  myFunction(year);
}

function myFunction(year) {
  // Your custom function logic here
  window.currentYearIndex = year - 1994;
  var yearElement = document.getElementById('year');
  yearElement.textContent = year;
  mapTrash(year);
  // You can perform any desired actions with the validated year
}
