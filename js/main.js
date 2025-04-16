import { load } from "./utils/templateLoader.js";
import { Validator } from "./controllers/validate.js";
import { Account } from "./models/account.js";
import { loginStatus } from "./controllers/loginStatus.js";
import { signOut } from "./controllers/signOut.js";
import { toastUI } from "./utils/toastUI.js";
import { dialog } from "./utils/dialog.js";

// Utils
// Tải template
document.addEventListener("DOMContentLoaded", () => {
  const templates = [
    { "#header": "./templates/header.html" },
    { "#subcribe": "./templates/subscribe.html" },
    { "#footer": "./templates/footer.html" },
    { "#nocopyright": "./templates/nocopyright.html" },
  ];

  for (const item of templates) {
    const selector = Object.keys(item)[0];
    const url = item[selector];

    if (document.querySelector(selector)) {
      load(selector, url);
    }
  }
});

// Controllers
// Validate form

Validator({
  form: "#form__login",
  formGroupSelector: ".loginSignin__group",
  errorSelector: ".loginSignin__label--message",
  rules: [
    Validator.isRequired("#username__login", "Vui lòng nhập tên đầy đủ"),
    Validator.isRequired("#password__login", "Vui lòng nhập mật khẩu"),
    Validator.minLength("#password__login", 6),
  ],

  onSubmit: function (data) {
    let accounts = JSON.parse(localStorage.getItem("arrAccount")) || [];
    // Tìm tài khoản hợp lệ
    let account = accounts.find(
      (account) =>
        account.username === data.username__login &&
        account.password === data.password__login
    );

    if (account) {
      document.querySelector(".loginSignin__error").innerHTML = "";

      const currentUser = sessionStorage.setItem(
        "currentUser",
        JSON.stringify(account)
      ); // Lưu thông tin tài khoản vào sessionStorage

      // Đã đăng nhập
      loginStatus("true");

      toastUI({
        type: "success",
        message: "Đăng nhập thành công",
        desc: "Chúc mừng bạn đã đăng nhập thành công",
      });

      // Chuyển hướng sau khi toast hiển thị xong (3 giây)
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2500);
    } else {
      const errorElement = document.querySelector(".loginSignin__error");
      if (errorElement) {
        errorElement.innerHTML = "Tên đăng nhập hoặc mật khẩu không chính xác";
      }
    }
  },
});

Validator({
  form: "#form__signin",
  formGroupSelector: ".loginSignin__group",
  errorSelector: ".loginSignin__label--message",
  rules: [
    Validator.isRequired("#username__signin", "Vui lòng nhập tên đầy đủ"),
    Validator.isUsernameExist("#username__signin", "Tên đăng ký đã tồn tại"),
    Validator.isEmail("#email__signin"),
    Validator.isRequired("#password__signin", "Vui lòng nhập mật khẩu"),
    Validator.minLength("#password__signin", 6),
    Validator.isRequired(
      "#password-confirmation__signin",
      "Vui lòng nhập lại mật khẩu"
    ),
    Validator.isConfirmed(
      "#password-confirmation__signin",
      function () {
        return document.querySelector("#form__signin #password__signin").value;
      },
      "Mật khẩu nhập lại không chính xác"
    ),
  ],
  onSubmit: function (data) {
    let accounts = JSON.parse(localStorage.getItem("arrAccount")) || [];

    // Kiểm tra xem username đã tồn tại chưa
    let isExist = accounts.some(
      (account) => account.username === data.username__signin
    );
    if (isExist) {
      document.querySelector(".loginSignin__label--message").innerHTML =
        "Tên đăng ký đã tồn tại";
      return;
    }

    let newAccount = new Account(
      data.username__signin,
      data.email__signin,
      data.password__signin
    );

    // Thêm vào danh sách tài khoản
    accounts.push(newAccount);
    localStorage.setItem("arrAccount", JSON.stringify(accounts));
    // Hiện dialog thông báo
    dialog({
      title: "Đăng ký tài khoản",
      message: "Đăng ký tài khoản thành công",
      type: "success",
      action: "Go to login",
      onClose: function () {
        window.location.href = "login.html";
      },
    });
  },
});

// Cập nhật thanh header
document.addEventListener("DOMContentLoaded", () => {
  const loginStatusValue = sessionStorage.getItem("loginStatus") || "false";
  loginStatus(loginStatusValue);
});

// // Sự kiện đăng xuất
// signOut("signOut__btn");