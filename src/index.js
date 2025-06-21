let addToy = false;
const BASE_URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }
  );


 // Fetch and render all toys
  fetch(BASE_URL)
    .then(response => response.json())
    .then(toys => toys.forEach(renderToyCard))
    .catch(error => console.error("Error fetching toys:", error));

  // Render a single toy card
  function renderToyCard(toy) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;

    // Handle like button click
    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => {
      const newLikes = toy.likes + 1;

      fetch(`${BASE_URL}/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
      })
        .then(res => res.json())
        .then(updatedToy => {
          toy.likes = updatedToy.likes;
          card.querySelector("p").textContent = `${updatedToy.likes} Likes`;
        })
        .catch(error => console.error("Error updating likes:", error));
    });

    toyCollection.appendChild(card);
  }

  // Handle new toy form submission
  addToyForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const image = event.target.image.value.trim();

    if (!name || !image) {
      alert("Please provide both name and image URL.");
      return;
    }

    const newToy = {
      name,
      image,
      likes: 0
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(toy => {
        renderToyCard(toy);
        addToyForm.reset();
        formContainer.style.display = "none";
        addToyVisible = false;
      })
      .catch(error => console.error("Error adding new toy:", error));
  });
  });


  

