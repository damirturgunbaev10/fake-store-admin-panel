const API = "https://fakestoreapi.com/products";
const productList = document.getElementById("productList");
const elLogout = document.querySelector(".logout__btn");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
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
    data.slice(0, 15).forEach((p) => {
      productList.innerHTML += `
          <tr>
            <td class=id>${p.id}</td>
            <td class=title>${p.title}</td>
            <td class=price>$${p.price}</td>
            <td class="actions">
              <button class="edit" onclick="editProduct(${p.id}, '${p.title}', ${p.price})">Edit</button>
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
};

document.getElementById("saveProduct").onclick = () => {
  const product = {
    title: titleInput.value,
    price: priceInput.value,
  };

  if (editId) {
    axios.put(`${API}/${editId}`, product).then(() => loadProducts());
  } else {
    axios.post(API, product).then(() => loadProducts());
  }

  modal.classList.add("hidden");
};

function editProduct(id, title, price) {
  modal.classList.remove("hidden");
  titleInput.value = title;
  priceInput.value = price;
  editId = id;
}

function deleteProduct(id) {
  axios.delete(`${API}/${id}`).then(() => loadProducts());
}

document.querySelector("#close").onclick = () => {
  modal.classList.add("hidden");
};
