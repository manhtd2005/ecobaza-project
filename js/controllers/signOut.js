import { loginStatus } from "../controllers/loginStatus.js";

export function signOut(selector) {
  const buttonSignOut = document.querySelector(`.${selector}`);
  if (buttonSignOut) {
    buttonSignOut.addEventListener("click", () => {
      // Xóa thông tin đăng nhập
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("loginStatus");

      // Cập nhật UI ngay lập tức
      loginStatus("false");

      // Chờ 3 giây trước khi reload
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
}