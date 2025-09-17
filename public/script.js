const api_url = "http://localhost:5000/user";

const userList = document.getElementById("user-list");
const formContainer = document.getElementById("user-form-container");
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const userForm = document.getElementById("user-form");

// Fetch users
async function fetchUsers() {
  userList.innerHTML = "<p>Loading users...</p>";
  try {
    const res = await fetch(api_url);
    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();

    // Use the array inside allUsers
    const users = data.allUsers || [];

    userList.innerHTML = "";

    users.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add("user-card");
      div.innerHTML = `
        <strong>${user.name}</strong>
        <span>${user.email}</span>
        <span>${new Date(user.registrationDate).toLocaleDateString()}</span>
      `;
      userList.appendChild(div);
    });

    if (users.length === 0) {
      userList.innerHTML = "<p>No users found</p>";
    }
  } catch (err) {
    userList.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
}


// Open form
openFormBtn.addEventListener("click", () => {
  formContainer.classList.remove("hidden");
});

// Close form
closeFormBtn.addEventListener("click", () => {
  formContainer.classList.add("hidden");
});

// Handle form submit
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newUser = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value, // ✅ make sure form has this field
  };

  try {
    const res = await fetch(api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error("Failed to add user");

    userForm.reset();
    formContainer.classList.add("hidden");
    fetchUsers(); // refresh list
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Initial render
fetchUsers();
