// This function waits for the DOM to be loaded before executing its code
document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the hamburger menu button
    const menuButton = document.querySelector(".menu-button");
    
    // Get a reference to the navigation menu
    const navigationMenu = document.querySelector(".navigation-menu");
    
    // Add a click event listener to the hamburger menu button
    menuButton.addEventListener("click", function() {
      // Toggle the "active" class on the hamburger menu button
      menuButton.classList.toggle("active");
      
      // Toggle the "active" class on the navigation menu
      navigationMenu.classList.toggle("active");
    });
    
    // Get a reference to the "load more" button
    const loadMoreButton = document.querySelector(".load-more-button");
    
    // Add a click event listener to the "load more" button
    loadMoreButton.addEventListener("click", function() {
      // Get the current page number from a data attribute on the button
      const currentPage = parseInt(loadMoreButton.dataset.page);
      
      // Calculate the URL to fetch the next page of posts
      const nextUrl = `/posts?page=${currentPage + 1}`;
      
      // Use the fetch API to fetch the next page of posts
      fetch(nextUrl)
        .then(response => response.json())
        .then(data => {
          // Get a reference to the container for the post cards
          const postCardsContainer = document.querySelector(".post-cards-container");
          
          // Loop through the array of posts and create new post card elements
          data.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `
              <a href="/posts/${post.id}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
              </a>
            `;
            postCardsContainer.appendChild(postCard);
          });
          
          // If there are no more pages of posts, hide the "load more" button
          if (data.length === 0) {
            loadMoreButton.style.display = "none";
          }
          
          // Update the data attribute on the "load more" button to the next page number
          loadMoreButton.dataset.page = currentPage + 1;
        });
    });
  });