const folderButtons = document.querySelectorAll(".folder");
const windowDialog = document.querySelector(".xp-window");
const windowTitle = document.querySelector("#window-title");
const windowMessage = document.querySelector("#window-message");
const closeButton = document.querySelector(".xp-window__close");
const slide = document.querySelector("#slide");
const slideLogo = document.querySelector("#slide-logo");
const slideHeading = document.querySelector("#slide-heading");
const slideCopy = document.querySelector("#slide-copy");
const slideNavigation = document.querySelector("#slide-navigation");
const slideCount = document.querySelector("#slide-count");
const previousSlide = document.querySelector("#previous-slide");
const nextSlide = document.querySelector("#next-slide");
const startButton = document.querySelector(".start-button");
const startMenu = document.querySelector(".start-menu");

const folderSlides = {
  "what I studied": [
    {
      logo: "assets/tunis-el-manar-university.png",
      logoAlt: "University of Tunis El Manar logo",
      heading: "BSc in Computer Science: ",
      copy: "My first steps in the field of IT were in 2019 at Tunis El Manar University. In 2022 I graduated not only with very good distinction but also with so many memories of the experiences with the uni's clubs and organizations (find out more in \"what I also like to do\" folder).",
    },
    {
      logo: "assets/tunis-el-manar-university.png",
      logoAlt: "University of Tunis El Manar logo",
      heading: "Data Science Engineering: ",
      copy: "After graduating, I was admitted, through the National Engineer's Degree program for top bachelor graduates, to the Engineering Course in Data Science. I passed the first year in 2023. Then I had a change of plans.",
    },
    {
      logo: "assets/elte-logo.png",
      logoAlt: "Eötvös Loránd University logo",
      heading: "Data Science Master's Degree: ",
      copy: "In 2023, I received the Stipendium Hungaricum Scholarship from the Tempus Public Foundation to pursue my master's degree in Data Science at Eötvös Loránd University. I graduated in July 2025.",
    },
  ],
  "what I worked in": [
    {
      logo: "assets/snit-logo.png",
      logoAlt: "SNIT logo",
      heading: "IT intern: ",
      copy: "My first internship was at SNIT NORD from June 2021 to July 2021. I worked on planning and modeling UML diagrams, as well as front-end development of a web application managing the workflow of employees' loans and bonus demands. I used StarUML for diagram modeling and HTML/CSS for front-end development.",
    },
    {
      logo: "assets/stb-bank-logo.png",
      logoAlt: "STB Bank logo",
      heading: "Web Developer Intern: ",
      copy: "This was a 5-month internship from Feb 2022 to Jun 2022 at STB Bank. I developed a multi-role web application collecting employees' maintenance-related complaints, and creating a clear workflow for the maintenance department manager and workers through the repair process. I used Angular framework and Bootstrap for front-end development, and Express.js and Node.JS for backend development, and MongoDB as a database system.",
    },
  ],
};

let activeSlides = [];
let activeSlideIndex = 0;

function renderSlide() {
  const activeSlide = activeSlides[activeSlideIndex];
  slideLogo.src = activeSlide.logo;
  slideLogo.alt = activeSlide.logoAlt;
  slideHeading.textContent = activeSlide.heading;
  slideCopy.textContent = activeSlide.copy;
  slideCount.textContent = `${activeSlideIndex + 1} of ${activeSlides.length}`;
  previousSlide.disabled = activeSlideIndex === 0;
  nextSlide.disabled = activeSlideIndex === activeSlides.length - 1;
}

folderButtons.forEach((folder) => {
  folder.addEventListener("click", () => {
    const title = folder.dataset.windowTitle;
    windowTitle.textContent = title;
    activeSlides = folderSlides[title] || [];
    activeSlideIndex = 0;
    const hasSlides = activeSlides.length > 0;
    slide.hidden = !hasSlides;
    slideNavigation.hidden = !hasSlides;
    windowMessage.hidden = hasSlides;
    windowMessage.textContent = "";
    if (hasSlides) renderSlide();
    windowDialog.showModal();
  });
});

previousSlide.addEventListener("click", () => {
  if (activeSlideIndex > 0) {
    activeSlideIndex -= 1;
    renderSlide();
  }
});

nextSlide.addEventListener("click", () => {
  if (activeSlideIndex < activeSlides.length - 1) {
    activeSlideIndex += 1;
    renderSlide();
  }
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
