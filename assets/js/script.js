'use strict';

/* -----------------------------
   NAVBAR TOGGLE
----------------------------- */
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const header = document.querySelector("[data-header]");

[navOpenBtn, navCloseBtn].forEach(btn => {
  btn.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
});

/* -----------------------------
   HEADER SCROLL EFFECT
----------------------------- */
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY >= 50) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }
});

/* -----------------------------
   PAGE NAVIGATION
----------------------------- */
// This lets navigation links open new pages properly
document.querySelectorAll("[data-nav-link]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetPage = link.getAttribute("href");
    window.location.href = targetPage;
  });
});

/* -----------------------------
   SEARCH TOGGLE
----------------------------- */
const searchContainer = document.querySelector("[data-search-wrapper]");
const searchBtn = document.querySelector("[data-search-btn]");

if (searchBtn && searchContainer) {
  searchBtn.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
  });
}

/* -----------------------------
   WISHLIST & CART SIDE PANELS
----------------------------- */
const panelBtns = document.querySelectorAll("[data-panel-btn]");
const sidePanels = document.querySelectorAll("[data-side-panel]");

panelBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const clickedPanel = btn.dataset.panelBtn;

    sidePanels.forEach(panel => {
      if (panel.dataset.sidePanel === clickedPanel) {
        panel.classList.toggle("active");
      } else {
        panel.classList.remove("active");
      }
    });
  });
});

/* -----------------------------
   BACK TO TOP BUTTON
----------------------------- */
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (backTopBtn) {
    window.scrollY >= 100
      ? backTopBtn.classList.add("active")
      : backTopBtn.classList.remove("active");
  }
});

/* -----------------------------
   SMOOTH SCROLLING
----------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* -----------------------------
   PRODUCT DETAILS IMAGE SWITCHER
----------------------------- */
const productDisplay = document.querySelector("[data-product-display]");
const productThumbnails = document.querySelectorAll("[data-product-thumbnail]");

productThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener("click", () => {
    if (productDisplay) {
      productDisplay.src = thumbnail.src;
      productDisplay.classList.add("fade-anim");

      setTimeout(() => {
        productDisplay.classList.remove("fade-anim");
      }, 250);
    }
    
    // Remove active class from all thumbnails
    productThumbnails.forEach(thumb => thumb.classList.remove('active'));
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
  });
});

/* -----------------------------
   ANIMATION ON SCROLL
----------------------------- */
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section-title, .product-card, .offers-card, .service-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.animationPlayState = 'running';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

/* -----------------------------
   CART FUNCTIONALITY
----------------------------- */
// Function to get cart items from localStorage
function getCartItems() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Function to save cart items to localStorage
function saveCartItems(cartItems) {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to add item to cart
function addToCart(productName, price, image) {
  // Get current cart items
  let cartItems = getCartItems();
  
  // Check if product already exists in cart
  const existingItemIndex = cartItems.findIndex(item => item.name === productName);
  
  if (existingItemIndex > -1) {
    // If item exists, increment quantity
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // If new item, add to cart
    const newItem = {
      id: Date.now(), // Simple ID generation
      name: productName,
      price: parseFloat(price),
      quantity: 1,
      image: image
    };
    cartItems.push(newItem);
  }
  
  // Save updated cart
  saveCartItems(cartItems);
  
  // Show enhanced toast notification
  showToast(productName + ' added to cart!', 'success');
  
  // Update cart badge
  updateCartBadge(cartItems);
  
  // Redirect to cart page after a short delay
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1500);
}

// Function to update cart badge
function updateCartBadge(cartItems) {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.querySelector('[data-panel-btn="cart"] .btn-badge');
  
  if (cartBadge) {
    cartBadge.setAttribute('value', totalItems);
    cartBadge.textContent = totalItems.toString().padStart(2, '0');
  }
}

// Enhanced function to show toast notifications
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    
    // Remove all existing classes except the base 'toast' class
    toast.className = 'toast';
    
    // Add type-specific class
    if (type) {
      toast.classList.add(type);
    }
    
    // Show toast with animation
    toast.classList.add('show');
    
    // Hide toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
  // Handle "Add to Cart" buttons on index.html
  const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product information from the card
      const productCard = this.closest('.product-card');
      if (productCard) {
        const productNameElement = productCard.querySelector('.card-title a');
        const productPriceElement = productCard.querySelector('.price');
        const productImageElement = productCard.querySelector('.card-banner img');
        
        const productName = productNameElement ? productNameElement.textContent : 'Unknown Product';
        const price = productPriceElement ? productPriceElement.getAttribute('value') : '0';
        const image = productImageElement ? productImageElement.src : '';
        
        addToCart(productName, price, image);
      }
    });
  });
  
  // Handle "Add to Cart" button on product-details.html
  const productDetailsAddToCartButton = document.querySelector('.product-details-content .product-qty-btn');
  if (productDetailsAddToCartButton) {
    productDetailsAddToCartButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product information from the page
      const productNameElement = document.querySelector('.product-title');
      const productPriceElement = document.querySelector('.product-price');
      
      const productName = productNameElement ? productNameElement.textContent : 'Unknown Product';
      const price = productPriceElement ? productPriceElement.getAttribute('value') : '0';
      // Use the main product image
      const image = document.querySelector('[data-product-display]') ? document.querySelector('[data-product-display]').src : '';
      
      addToCart(productName, price, image);
    });
  }
  
  // Update cart badge on page load
  const cartItems = getCartItems();
  updateCartBadge(cartItems);
});

// Add enhanced CSS for toast notification
if (!document.querySelector('#toast-style')) {
  const style = document.createElement('style');
  style.id = 'toast-style';
  style.textContent = `
    #toast {
      visibility: hidden;
      min-width: 250px;
      background-color: #4CAF50;
      color: #fff;
      text-align: center;
      border-radius: 8px;
      padding: 16px;
      position: fixed;
      z-index: 1001;
      top: 20px;
      right: 20px;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }

    #toast.show {
      visibility: visible;
      transform: translateX(0);
    }

    #toast.error {
      background-color: #f44336;
    }

    #toast.warning {
      background-color: #ff9800;
    }

    #toast.info {
      background-color: #2196F3;
    }

    @keyframes fadeout {
      from {transform: translateX(0); opacity: 1;}
      to {transform: translateX(100%); opacity: 0;}
    }
  `;
  document.head.appendChild(style);
}
