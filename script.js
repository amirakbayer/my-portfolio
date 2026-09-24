const folderButtons = document.querySelectorAll(".folder");
const windowDialog = document.querySelector(".xp-window");
const windowTitle = document.querySelector("#window-title");
const windowMessage = document.querySelector("#window-message");
const closeButton = document.querySelector(".xp-window__close");
const startButton = document.querySelector(".start-button");
const startMenu = document.querySelector(".start-menu");

folderButtons.forEach((folder) => {
  folder.addEventListener("click", () => {
    const title = folder.dataset.windowTitle;
    windowTitle.textContent = title;
    windowMessage.textContent = `Welcome to ${title}.`;
    windowDialog.showModal();
  });
});

closeButton.addEventListener("click", () => windowDialog.close());

windowDialog.addEventListener("click", (event) => {
  if (event.target === windowDialog) windowDialog.close();
});

startButton.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = !startMenu.hidden;
  startMenu.hidden = isOpen;
  startButton.setAttribute("aria-expanded", String(!isOpen));
});

document.addEventListener("click", (event) => {
  if (!startMenu.hidden && !startMenu.contains(event.target)) {
    startMenu.hidden = true;
    startButton.setAttribute("aria-expanded", "false");
  }
});
