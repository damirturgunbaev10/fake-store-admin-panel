const API = "https://fakestoreapi.com/users";
const productList = document.getElementById("productList");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const modal = document.getElementById("modal");
let editId = null;

document.querySelector(".logout__btn").onclick = () => {
  localStorage.clear();
  location.href = "/pages/index.html";
};

function fetchUsers() {
  axios.get(API).then(({ data }) => {
    productList.innerHTML = "";

    data.slice(0, 10).forEach((user) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </td>
      `;

      tr.querySelector(".edit").addEventListener("click", () => editUser(user));

      tr.querySelector(".delete").addEventListener("click", () =>
        deleteUser(user.id),
      );

      productList.appendChild(tr);
    });
  });
}

fetchUsers();

document.querySelector(".add__user__btn").onclick = () => {
  modal.classList.remove("hidden");
  editId = null;
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
};

document.getElementById("saveProduct").onclick = () => {
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const request = editId
    ? axios.put(`${API}/${editId}`, user)
    : axios.post(API, user);

  request.then(() => {
    modal.classList.add("hidden");
    fetchUsers();
  });
};

function editUser(user) {
  modal.classList.remove("hidden");
  editId = user.id;
  usernameInput.value = user.username;
  emailInput.value = user.email;
  passwordInput.value = user.password;
}

function deleteUser(id) {
  axios.delete(`${API}/${id}`).then(fetchUsers);
}

document.getElementById("close").onclick = () => {
  modal.classList.add("hidden");
};
