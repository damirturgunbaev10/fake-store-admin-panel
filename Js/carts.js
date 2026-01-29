const API = "https://fakestoreapi.com/carts";
const cartList = document.getElementById("cartList");
const modal = document.getElementById("modal");
const userIdInput = document.getElementById("userId");
const dateInput = document.getElementById("date");
let editId = null;

document.querySelector(".logout__btn").onclick = () => {
  localStorage.clear();
  location.href = "/pages/index.html";
};

function fetchCarts() {
  axios.get(API).then(({ data }) => {
    cartList.innerHTML = "";

    data.slice(0, 10).forEach((cart) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${cart.id}</td>
        <td>${cart.userId}</td>
        <td>${new Date(cart.date).toLocaleDateString()}</td>
        <td>${cart.products.length}</td>
        <td class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </td>
      `;

      tr.querySelector(".edit").addEventListener("click", () => editCart(cart));

      tr.querySelector(".delete").addEventListener("click", () =>
        deleteCart(cart.id),
      );

      cartList.appendChild(tr);
    });
  });
}

fetchCarts();

function editCart(cart) {
  modal.classList.remove("hidden");
  editId = cart.id;

  userIdInput.value = cart.userId;
  dateInput.value = cart.date;
  productCountInput.value = cart.products.length;
}

document.getElementById("saveCart").onclick = () => {
  const count = Number(productCountInput.value);

  const updatedCart = {
    userId: Number(userIdInput.value),
    date: dateInput.value,
    products: Array.from({ length: count }, (_, i) => ({
      productId: i + 1,
      quantity: 1,
    })),
  };

  axios.put(`${API}/${editId}`, updatedCart).then(() => {
    modal.classList.add("hidden");
    fetchCarts();
  });
};
function deleteCart(id) {
  axios.delete(`${API}/${id}`).then(fetchCarts);
}

document.getElementById("close").onclick = () => {
  modal.classList.add("hidden");
};
