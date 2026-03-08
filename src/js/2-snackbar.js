import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(form);

  const delay = Number(formData.get("delay"));
  const state = formData.get("state");

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });

  promise
  .then((value) =>{
    iziToast.show({
          message: `✅ Fulfilled promise in ${value}ms`,
        })
  })
  .catch((value) =>{
    iziToast.show({
          message: `❌ Rejected promise in ${value}ms`,
        })
  })
});