export function dialog({ title, message, type, action, onClose }) {
  // Xóa dialog cũ nếu đã tồn tại
  document.querySelector(".dialog__overlay")?.remove();

  // Tạo overlay
  const overlay = document.createElement("div");
  overlay.className = "dialog__overlay";

  // Tạo nội dung dialog
  overlay.innerHTML = `
    <div class="dialog">
        <img src="./assets/media/dialog/${type}.svg" alt="${type}" class="dialog__icon">
        <h2 class="heading__secondary">${title}</h2>
        <p class="dialog__message">${message}</p>
        <button class="dialog__action">${action}</button>
    </div>
    `;

  document.body.appendChild(overlay);
  const actionBtn = overlay.querySelector(".dialog__action");

  // Hàm đóng dialog
  function closeDialog() {
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 300);
    document.removeEventListener("keydown", escListener);
    if (typeof onClose === "function") onClose();
  }

  // Sự kiện đóng dialog khi nhấn ESC
  function escListener(event) {
    if (event.key === "Escape") closeDialog();
  }

  // Thêm sự kiện
  actionBtn.addEventListener("click", closeDialog, { once: true });
  overlay.addEventListener(
    "click",
    (event) => event.target === overlay && closeDialog()
  );
  document.addEventListener("keydown", escListener);
}
