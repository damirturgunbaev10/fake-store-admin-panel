const API = "https://fakestoreapi.com/users";
const productList = document.getElementById("productList");
const elLogout = document.querySelector(".logout__btn");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passowordInput = document.getElementById("password");
const modal = document.getElementById("modal");

elLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usename");
  window.location.href = "/pages/index.html";
});

function fetchProducts() {
  axios.get(API).then((res) => {
    const data = res.data;
    productList.innerHTML = "";
    data.slice(0, 10).forEach((p) => {
      productList.innerHTML += `
          <tr>
            <td class=id>${p.id}</td>
            <td>${p.username}</td>
            <td>$${p.email}</td>
            <td>$${p.password}</td>
            <td class="actions">
              <button class="edit" onclick="editProduct('${p.id}' , '${p.username}' , '${p.email}' ,  '${p.passoword}')">Edit</button>
              <button class="delete" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
          </tr>
        `;
    });
  });
}

fetchProducts();

document.querySelector(".add__user__btn").onclick = () => {
  modal.classList.remove("hidden");
  editId = null;
  usernameInput.value = "";
  emailInput.value = "";
  passowordInput.value = "";
};

document.querySelector("#saveProduct").onclick = () => {
  const product = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passowordInput.value,
  };

  if (editId) {
    axios.put(`${API}/${editId}`, product).then(() => loadProducts());
  } else {
    axios.post(API, product).then(() => loadProducts());
  }

  modal.classList.add("hidden");
};

function editProduct(id, username, email, password) {
  modal.classList.remove("hidden");
  usernameInput.value = username;
  emailInput.value = email;
  passowordInput.value = password;
  editId = id;
}

function deleteProduct(id) {
  axios.delete(`${API}/${id}`).then(() => loadProducts());
}

document.querySelector("#close").onclick = () => {
  modal.classList.add("hidden");
};
