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
            <td class=title>${p.title}</td>
            <td class=price>${p.price}</td>
            <td class=price>${p.category}</td>
            <td class=price>${p.description.slice(0, 20)}...</td>
            <td class="actions">
              <button class="edit" onclick="editProduct('${p.id}' , '${p.title}' , '${p.price}' , '${p.description}')">Edit</button>
              <button class="delete" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
          </tr>
        `;
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

function editProduct(id, title, price, description, category) {
  modal.classList.remove("hidden");
  titleInput.value = title;
  priceInput.value = price;
  descriptionInput.value = description;
  categoryInput.value = category;
  editId = id;
}

function deleteProduct(id) {
  axios.delete(`${API}/${id}`).then(() => loadProducts());
}

document.querySelector("#close").onclick = () => {
  modal.classList.add("hidden");
};
