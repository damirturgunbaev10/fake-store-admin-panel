const elForm = document.querySelector(".form__login");
const api = "https://fakestoreapi.com/auth/login";

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const user = {
    username: username,
    password: password,
  };
  localStorage.setItem("usename", username);
  login(api, user);
});

function login(url, data) {
  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        Toastify({
          text: "Login Successfull",
          duration: 2000,
          destination: "https://github.com/apvarun/toastify-js",
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast();

        setTimeout(() => {
          window.location.href = "/pages/dashboard.html";
        }, 2000);
      }
    })
    .catch((err) => {
      Toastify({
        text: "Login Failed",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            "linear-gradient(to right,rgb(176, 0, 0),rgb(201, 61, 61))",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    });
}