const API = "https://fakestoreapi.com/products";
const productList = document.querySelector("#productList");
const elLogout = document.querySelector(".logout__btn");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const descriptionInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");
const usersLink = document.querySelector(".users__link");
const modal = document.querySelector("#modal");

elLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usename");
  window.location.href = "/index.html";
});

function fetchProducts() {
  axios.get(API).then((res) => {
    productList.innerHTML = "";

    res.data.slice(0, 10).forEach((p) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.price}</td>
        <td>${p.category}</td>
        <td>${p.description.slice(0, 20)}...</td>
        <td class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </td>
      `;

      tr.querySelector(".edit").addEventListener("click", () => {
        editProduct(p);
      });

      tr.querySelector(".delete").addEventListener("click", () => {
        deleteProduct(p.id);
      });

      productList.appendChild(tr);
    });
  });
}

fetchProducts();

document.querySelector(".add__product__btn").onclick = () => {
  modal.classList.remove("hidden");
  editId = null;
  titleInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
};

document.querySelector("#saveProduct").onclick = () => {
  const product = {
    title: titleInput.value,
    price: priceInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
  };

  if (editId) {
    axios.put(`${API}/${editId}`, product).then(() => loadProducts());
  } else {
    axios.post(API, product).then(() => loadProducts());
  }

  modal.classList.add("hidden");
};

function editProduct(product) {
  modal.classList.remove("hidden");
  titleInput.value = product.title;
  priceInput.value = product.price;
  descriptionInput.value = product.description;
  categoryInput.value = product.category;
  editId = product.id;
}

function deleteProduct(id) {
  axios.delete(`${API}/${id}`).then(() => loadProducts());
}

document.querySelector("#close").onclick = () => {
  modal.classList.add("hidden");
};
