const browser = window.browser || window.chrome;

let toggleLabel = document.querySelector(".toggle__label");
let toggleCheckbox = document.getElementById("mode-toggle");

async function updateUI() {
  let result = await browser.storage.local.get('isOn');
  let isOn = result.isOn;

  if (typeof isOn === "undefined") {
    isOn = false;
  }

  toggleLabel.style.backgroundColor = isOn ? "#28a745" : "#dc3545";
  toggleCheckbox.checked = isOn;
}

async function toggleExtension() {
  let result = await browser.storage.local.get('isOn');
  let isOn = result.isOn ?? false;

  let newIsOn = !isOn;

  await browser.storage.local.set({ isOn: newIsOn });

  toggleLabel.style.backgroundColor = newIsOn ? "#28a745" : "#dc3545";
  toggleCheckbox.checked = newIsOn;
}

document.addEventListener('DOMContentLoaded', updateUI);
toggleCheckbox.addEventListener('click', toggleExtension);
