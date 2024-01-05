function addData() {
  var storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  var newData = []; // Temporarily store new data

  while (true) {
    var userName = prompt("Please enter your name:", "");

    if (userName === null) {
      alert("Name is required");
      break; // Exit the loop
    } else if (userName.trim() === "") {
      alert("Name cannot be empty");
      continue; // Restart the loop
    }

    var userAge = prompt("Please enter your age:", "");
    if (userAge === null) {
      alert("Age is required");
      break; // Exit the loop
    } else if (isNaN(userAge) || userAge.trim() === "") {
      alert("Invalid age. Please enter a valid number.");
      continue; // Restart the loop
    }

    var userCity = prompt("Please enter your city:", "");
    if (userCity === null) {
      alert("City is required");
      break; // Exit the loop
    } else if (userCity.trim() === "") {
      alert("City cannot be empty");
      continue; // Restart the loop
    }

    newData.push({
      name: userName,
      age: parseInt(userAge),
      city: userCity,
    });
  }

  // Store all new data collected
  storedData = storedData.concat(newData);
  localStorage.setItem("storedData", JSON.stringify(storedData));
  displayData(); // Refresh the displayed table after adding data
}

function displayData() {
  var storedData = JSON.parse(localStorage.getItem("storedData")) || [];

  var displayContent = "";
  storedData.forEach(function (entry, index) {
    displayContent +=
      "<tr>" +
      "<td>" +
      entry.name +
      "</td>" +
      "<td>" +
      entry.age +
      "</td>" +
      "<td>" +
      entry.city +
      "</td>" +
      "<td>" +
      "<button class='btn btn-delete' onclick='deleteEntry(" +
      index +
      ")'>Delete</button>" +
      "<button class='btn btn-edit' onclick='editEntry(" +
      index +
      ")'>Edit</button>" +
      "</td>" +
      "</tr>";
  });
  document.getElementById("display").innerHTML = displayContent;
}

function deleteEntry(index) {
  var storedData = JSON.parse(localStorage.getItem("storedData")) || [];

  // Confirm deletion with the user
  var result = confirm("Are you sure you want to delete this?");

  if (result) {
    storedData.splice(index, 1);
    localStorage.setItem("storedData", JSON.stringify(storedData));
    alert("Data deleted!");
  } else {
    alert("Deletion cancelled.");
  }

  displayData(); // Refresh the displayed table after deletion or cancellation
}

function editEntry(index) {
  var storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  var newData = prompt(
    "Edit Data:\nName: " +
      storedData[index].name +
      "\nAge: " +
      storedData[index].age +
      "\nCity: " +
      storedData[index].city,
    JSON.stringify(storedData[index])
  );

  if (newData !== null) {
    storedData[index] = JSON.parse(newData);
    localStorage.setItem("storedData", JSON.stringify(storedData));
    displayData(); // Refresh the displayed table after editing
  }
}

// Call the function to begin adding and displaying data
addData();
