import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(form);

  const delay = Number(formData.get("delay"));
  const state = formData.get("state");

  setTimeout(() => {
    const promise = new Promise((res, rej) => {
      if (state === "fulfilled") {
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      } else {
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
        });
      }
    });
  }, delay);
});