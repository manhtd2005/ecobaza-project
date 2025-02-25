import { load } from "./utils/templateLoader.js";

// Tải template
const templates = [
  { "#header": "./templates/header.html" },
  { "#subcribe": "./templates/subscribe.html" },
  { "#footer": "./templates/footer.html" },
  { "#nocopyright": "./templates/nocopyright.html" },
];

for (const item of templates) {
  const selector = Object.keys(item)[0];
  const url = item[selector];
  load(selector, url);
}
