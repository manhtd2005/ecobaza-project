export class Account {
  constructor(username, email, password, phone) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }
}

// Kiểm tra nếu đã có dữ liệu trong localStorage thì lấy, nếu chưa thì dùng mảng mặc định
export let arrAccount = JSON.parse(localStorage.getItem("arrAccount")) || [
  new Account("manh123", "manh2005@gmail.com", "123456", "0987654321"),
  new Account("phuc123", "phuc2005@gmail.com", "123456", "0987654321"),
];

// Chuyển đổi object từ localStorage thành instance của Account
arrAccount = arrAccount.map(
  (acc) => new Account(acc.username, acc.email, acc.password, acc.phone)
);

// Lưu lại vào localStorage nếu chưa có dữ liệu
if (!localStorage.getItem("arrAccount")) {
  localStorage.setItem("arrAccount", JSON.stringify(arrAccount));
}
