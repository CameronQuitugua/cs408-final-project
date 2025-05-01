const stars = document.querySelectorAll(".stars i");
const dollars = document.querySelectorAll(".dollars i");

function getActiveStarCount() {
    const activeStars = document.querySelectorAll('#rate .fa-star.active');
    return activeStars.length;
}

function getActiveDollarCount() {
    const activeDollars = document.querySelectorAll('#cost .fa-dollar.active');
    return activeDollars.length;
}

// Loop through the "stars" NodeList
stars.forEach((star, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  star.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    stars.forEach((star, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
    });
  });
});

// Loop through the "stars" NodeList
dollars.forEach((dollar, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  dollar.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    dollars.forEach((dollar, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2 ? dollar.classList.add("active") : dollar.classList.remove("active");
    });
  });
});

/** PUT **/

document.getElementById("item-form").onsubmit = function (event) {
    event.preventDefault();
    
    let itemId = document.getElementById("id").value;
    let itemName = document.getElementById("name").value;
    let itemLoc = document.getElementById("loc").value;
    let itemRate = getActiveStarCount();
    let itemCost = getActiveDollarCount();
    let itemDescription = document.getElementById("des").value;

    let rate = parseFloat(itemRate);
    let cost = parseFloat(itemCost);
    if (isNaN(rate) || isNaN(cost)) {
      alert("NaN");
      return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://bk9z1yyk3j.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify({
        "id": itemId,        
        "name": itemName, 
        "location": itemLoc,   
        "rate": rate,    
        "cost": cost,
        "description": itemDescription
    }));

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert("Item added successfully!");
        } else {
            alert("Error adding item: " + xhr.responseText);
        }
    };

    document.getElementById("item-form").reset();
    stars.forEach((star) => {
        star.classList.remove("active");
    });
    dollars.forEach((dollar) => {
        dollar.classList.remove("active");
    });

};

/** GET **/

// document.getElementById("load-data").onclick = function () {
//     let tableBody = document.getElementById("data-table");
//     let xhr = new XMLHttpRequest();
    
//     xhr.addEventListener("load", function () {
//         try {
//             let data = JSON.parse(xhr.responseText);
//             tableBody.innerHTML = "";
            
//             data.forEach(item => {
//                 let row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${item.id}</td>
//                     <td>${item.name}</td>
//                     <td>${item.location}</td>
//                     <td>${item.rate}</td>
//                     <td>${item.cost}</td>
//                     <td>${item.description}</td>
//                     <td><button class="delete-data" data-id="${item.id}">Delete</button></td>
//                 `;
//                 tableBody.appendChild(row);
//             });

//             document.querySelectorAll(".delete-data").forEach(button => {
//                 button.addEventListener("click", function () {
//                     let itemId = this.getAttribute("data-id");
//                     deleteItem(itemId, this.closest("tr"));
//                 });
//             });

//         } catch (error) {
//             console.error("Error parsing JSON response:", error);
//         }
//     });

//     xhr.open("GET", "https://bk9z1yyk3j.execute-api.us-east-2.amazonaws.com/items");
//     xhr.send();
// };

/** DELETE **/

function deleteItem(itemId, row) {

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://bk9z1yyk3j.execute-api.us-east-2.amazonaws.com/items/${itemId}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            row.remove();
        } else {
            alert("Error");
        }
    };

xhr.send();
};