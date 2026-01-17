// Handle Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Registration successful! Please login now.");
    window.location.href = "login.html";
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}

// Restrict access to shopping pages
if (!window.location.href.includes("login.html") && !window.location.href.includes("register.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}
