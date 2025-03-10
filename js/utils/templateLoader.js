// Hàm tải template
export function load(selector, path) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Không tìm thấy phần tử với selector: "${selector}"`);
    return;
  }

  const cached = localStorage.getItem(path);
  if (cached) {
    element.innerHTML = cached;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        element.innerHTML = html;
        localStorage.setItem(path, html);
      }
    })
    .finally(() => {
      window.dispatchEvent(new Event("template-loaded"));
    });
}
