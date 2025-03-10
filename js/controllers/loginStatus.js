export function loginStatus(check) {
  // Lưu trạng thái đăng nhập vào sessionStorage
  sessionStorage.setItem("loginStatus", check);

  // Lấy các phần tử từ DOM
  const action = document.querySelector(".headerTop__action"); // Khách
  const user = document.querySelector(".headerTop__user"); // Thành viên
  const account = document.querySelector(".navbar__account"); // Thành viên
  const telephone = document.querySelector(".navbar__telephone"); // Khách

  // Kiểm tra xem phần tử có tồn tại không
  if (!action || !user || !account || !telephone) {
    return;
  }

  // Kiểm tra trạng thái đăng nhập (chuyển đổi từ chuỗi)
  const isLoggedIn = check === "true"; // `sessionStorage.getItem()` trả về chuỗi

  // Ẩn/hiện các phần tử theo trạng thái đăng nhập
  telephone.style.display = isLoggedIn ? "none" : "flex";
  account.style.display = isLoggedIn ? "flex" : "none";
  action.style.display = isLoggedIn ? "none" : "flex";
  user.style.display = isLoggedIn ? "flex" : "none";

  // Thay tên đăng nhập
  const username = document.querySelector(".navbar__account--name");
  if (username) {
    username.innerHTML = JSON.parse(sessionStorage.getItem("currentUser")).username;
  }
}
