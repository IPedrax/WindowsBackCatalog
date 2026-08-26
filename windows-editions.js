// Windows Back Catalog
// Paste into the DevTools console on https://www.microsoft.com/en-us/software-download/windows11
// and the edition dropdown gains every Windows release below instead of just the current one.
(() => {
  const editions = [
    [28,   "Windows 7 Starter SP1 (7601)"],
    [2,    "Windows 7 Home Basic SP1 (7601)"],
    [6,    "Windows 7 Home Premium SP1 (7601)"],
    [10,   "Windows 7 Home Premium N SP1 (7601)"],
    [4,    "Windows 7 Professional SP1 (7601)"],
    [12,   "Windows 7 Professional N SP1 (7601)"],
    [8,    "Windows 7 Ultimate SP1 (7601)"],
    [14,   "Windows 7 Ultimate N SP1 (7601)"],
    [48,   "Windows 8.1 Single Language (9600.17415)"],
    [52,   "Windows 8.1 (9600.17415)"],
    [55,   "Windows 8.1 N (9600.17415)"],
    [61,   "Windows 8.1 K (9600.17415)"],
    [62,   "Windows 8.1 KN (9600.17415)"],
    [68,   "Windows 8.1 Professional LE (9600.17415)"],
    [69,   "Windows 8.1 Professional LE K (9600.17415)"],
    [70,   "Windows 8.1 Professional LE KN (9600.17415)"],
    [71,   "Windows 8.1 Professional LE N (9600.17415)"],
    [2378, "Windows 10 22H2 Home China (19045.2006)"],
    [2618, "Windows 10 22H2 (19045.2965)"],
    [3113, "Windows 11 24H2 x64 (26100.1742)"],
    [3131, "Windows 11 24H2 Arm64 (26100.1742)"],
    [3262, "Windows 11 25H2 x64 (26200.6584)"],
    [3265, "Windows 11 25H2 Arm64 (26200.6584)"]
  ];
  const sel = document.querySelector("#product-edition")
           || [...document.querySelectorAll("select")]
                .find(s => /multi-edition|Select edition/i.test(s.textContent));
  if (!sel) return console.error("Edition dropdown not found.");
  sel.innerHTML = '<option value="" selected>Select edition</option>'
    + editions.map(([id, name]) => `<option value="${id}">${name}</option>`).join("");
  sel.dispatchEvent(new Event("change", { bubbles: true }));
  console.log("Injected", editions.length, "editions.");
})();
