function ensureToastContainer() {
  let container = document.querySelector(".toastUI");
  if (!container) {
    container = document.createElement("div");
    container.className = "toastUI";
    document.body.appendChild(container);
  }
  return container;
}

export function toastUI({ type, message, desc }) {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = `toastUI__item toastUI__${type}`;
  toast.innerHTML = `
    <img src="./assets/media/toastUI/${type}.svg" alt="" class="toastUI__item--icon">
    <div class="toastUI__item--content">
      <span class="toastUI__item--message">${message}</span>
      <p class="toastUI__item--desc">${desc}</p>
    </div>
    <button class="toastUI__item--close">
      <img src="./assets/media/toastUI/close.svg" alt="Đóng" class="toastUI__item--close__icon">
    </button>
  `;

  // Đóng toast khi bấm nút "X"
  toast.querySelector(".toastUI__item--close").addEventListener("click", () => {
    removeToast(toast);
  });

  container.appendChild(toast);

  // Tự động biến mất sau 3 giây
  setTimeout(() => removeToast(toast), 2000);
}

function removeToast(toast) {
  toast.style.animation = "fadeOut 0.3s ease";
  setTimeout(() => toast.remove(), 500);
}
