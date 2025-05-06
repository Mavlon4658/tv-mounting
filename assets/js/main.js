const formRange = document.querySelectorAll('.form-range__wrap');

if (formRange) {
  formRange.forEach(el => {
    const inp = el.querySelector('.form-range input[type="range"]');
    const line = el.querySelector('.form-range .form-line');
    const valText = el.querySelector('.home_calculate_block_text b');
    const select = el.querySelector('select');

    const inpHandle = () => {
      const min = +inp.min;
      const max = +inp.max;
      const val = +inp.value;

      line.style.width = (val - min) * 100 / (max - min) + '%';
      if (valText) {
        valText.innerText = val + ' in';
      }
      if (select) {
        let op = select.options;

        for (let i = 0; i < op.length; i++) {
          if (parseInt(op[i].text) == val) {
            select.selectedIndex = i
          }
        }

      }
    }

    inpHandle();

    inp.oninput = () => inpHandle();

    if (select) {
      select.onchange = () => {
        inp.value = parseInt(select.value);
        inpHandle();
      }
    }
  })
}

const alerts = document.querySelectorAll('.alert-wrap');

if (alerts) {
  alerts.forEach(el => {
    const btn = el.querySelector('.info_block');
    const alertEl = el.querySelector('.alert');
    const alertClose = el.querySelector('.alert button');

    btn.onclick = () => {
      alertEl.classList.toggle('active');
    }

    alertClose.onclick = () => {
      alertEl.classList.remove('active');
    }
  })
}

const items = document.querySelectorAll('.item');

items.forEach((item) => {
  const header = item.querySelector('.accordion_btn');
  const content = item.querySelector('.content');

  header.addEventListener('click', () => {
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
  });
});

const bodyHidden = () => {
  document.querySelector('body').style.overflow = 'hidden';
}

const bodyVisible = () => {
  document.querySelector('body').style.overflow = 'visible';
}

const menu = document.querySelector('.menu');
const bars = document.querySelector('.header .bars');
const menuClose = document.querySelector('.menu-close');
const menuBg = document.querySelector('.menu-bg');

const menuHide = () => {
  menu.classList.remove('active');
  menu.classList.add('end-active');
  setTimeout(() => {
    menu.classList.remove('end-active');
    bodyVisible();
  }, 400);
}

bars.onclick = () => {
  menu.classList.add('active');
  bodyHidden();
}
if (menuClose) menuClose.onclick = () => menuHide();
if (menuBg) menuBg.onclick = () => menuHide();

const homeSelects = document.querySelectorAll('.home-body ul li');

if (homeSelects.length) {
  homeSelects.forEach(el => {
    el.onclick = () => {
      homeSelects.forEach(data => {
        if (data == el) {
          data.classList.add('selected');
        } else {
          data.classList.remove('selected');
        }
      })
    }
  })
}

const home = document.querySelector('.home');
const homeBody = document.querySelector('.home-body__wrap');

window.addEventListener('scroll', function () {
  if (homeBody) {
    let elPosition = homeBody.getBoundingClientRect();

    if (this.window.innerWidth > 992) {
      if (elPosition.top <= 200) {
        home.classList.add('active');
      } else {
        home.classList.remove('active');
      }
    } else {
      if (elPosition.top <= 133) {
        home.classList.add('active');
      } else {
        home.classList.remove('active');
      }
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const progress = document.querySelector(".progress");
  const nextBtn = document.querySelector(".next-btn");
  const sections = document.querySelectorAll(".section");
  const bottomBar = document.querySelector(".bottom-bar");
  const sectionLinks = document.querySelectorAll(".section-link");
  const allOptionBtns = document.querySelectorAll(".option-btn");

  if (steps.length) {
    const stepSections = {
      "Job details": ["tvSize", "wallType", "extraServices", "hardware", "additionalTV"],
      "Date and time": ["dateWorks"],
      "Location": ["installationAddress"],
      "Done!": ["booking", "congrats"],
    };

    let currentStep = 0;
    let currentSectionIndex = 0;
    const initialProgress = 12;
    const jobDetailsSections = stepSections["Job details"].length;
    const progressToDate = (32 - initialProgress) / jobDetailsSections;

    progress.style.width = `${initialProgress}%`;
    showSection(stepSections["Job details"][0]);
    updateNextButtonState();

    // Option-btn lar uchun hodisa
    allOptionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parentOptions = btn.closest(".options");
        const sectionId = parentOptions.closest(".section").id;

        // Agar section "wallType" yoki "extraServices" bo‘lsa, checkbox tarzida ishlaydi
        if (sectionId === "wallType" || sectionId === "extraServices") {
          // Checkbox logikasi: tugma faol bo‘lsa o‘chiriladi, aks holda faollashtiriladi
          btn.classList.toggle("active");
        } else {
          // Radio logikasi: boshqa tugmalarni o‘chirib, faqat tanlangan tugmani faollashtiradi
          parentOptions.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        }

        updateNextButtonState();
      });
    });

    // Next button hodisasi
    nextBtn.addEventListener("click", () => {
      const stepNames = Object.keys(stepSections);

      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        const currentSectionId = sections[currentSectionIndex].id;

        for (let i = 0; i < stepNames.length; i++) {
          if (stepSections[stepNames[i]].includes(currentSectionId)) {
            if (currentStep !== i) {
              currentStep = i;
              updateStepIndicators();
            }
            break;
          }
        }

        updateProgress(currentSectionId);
        showSection(currentSectionId);
        updateSectionLink(currentSectionId);
        updateNextButtonState();

        if (currentSectionId === "booking") {
          nextBtn.textContent = "Finish";
        }

        if (currentSectionId === "congrats") {
          bottomBar.style.display = "none";
        }
      }
    });

    // Previous section mapping
    const prevSectionMap = {
      wallTypeLink: "tvSize",
      extraServicesLink: "wallType",
      hardwareLink: "extraServices",
      additionalTVLink: "hardware",
      dateWorksLink: "additionalTV",
      installationAddressLink: "dateWorks",
      bookingLink: "installationAddress",
      installationAddress: "dateWorks",
      booking: "dateWorks",
    };

    sectionLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const prevSectionId = prevSectionMap[link.id];
        if (prevSectionId) {
          const prevSectionIndex = Array.from(sections).findIndex((section) => section.id === prevSectionId);
          if (prevSectionIndex !== -1) {
            currentSectionIndex = prevSectionIndex;
            const stepNames = Object.keys(stepSections);
            for (let i = 0; i < stepNames.length; i++) {
              if (stepSections[stepNames[i]].includes(prevSectionId)) {
                currentStep = i;
                updateStepIndicators();
                break;
              }
            }
            updateProgress(prevSectionId);
            showSection(prevSectionId);
            updateSectionLink(prevSectionId);
            updateNextButtonState();
            nextBtn.textContent = "Next";
            bottomBar.style.display = "flex";
          }
        }
      });
    });

    // Quyidagi funksiyalar o‘zgarmaydi
    function updateProgress(currentSectionId) {
      let newWidth;
      if (stepSections["Job details"].includes(currentSectionId)) {
        const indexInJobDetails = stepSections["Job details"].indexOf(currentSectionId);
        newWidth = initialProgress + indexInJobDetails * progressToDate;
      } else if (currentSectionId === "dateWorks") {
        newWidth = 38;
      } else if (currentSectionId === "installationAddress") {
        newWidth = 75;
      } else if (currentSectionId === "booking") {
        newWidth = 87.5;
      } else if (currentSectionId === "congrats") {
        newWidth = 100;
      }
      progress.style.width = `${newWidth}%`;
    }

    function updateStepIndicators() {
      steps.forEach((step, index) => {
        if (index <= currentStep) {
          step.classList.add("active");
          step.querySelector(".step-name").classList.add("active");
        } else {
          step.classList.remove("active");
          step.querySelector(".step-name").classList.remove("active");
        }
      });
    }

    function showSection(sectionId) {
      sections.forEach((section) => {
        section.classList.toggle("show", section.id === sectionId);
      });
    }

    function updateSectionLink(currentSectionId) {
      sectionLinks.forEach((link) => {
        const linkId = link.id.replace("Link", "");
        if (linkId === currentSectionId) {
          link.classList.remove("hide");
        } else {
          link.classList.add("hide");
        }
      });
    }

    function updateNextButtonState() {
      const currentSection = sections[currentSectionIndex];
      const optionBtns = currentSection.querySelectorAll(".option-btn");
      if (optionBtns.length > 0) {
        const hasActive = Array.from(optionBtns).some((btn) => btn.classList.contains("active"));
        nextBtn.disabled = !hasActive;
      } else {
        nextBtn.disabled = false;
      }
    }

    // Kalendar kodi o‘zgarmaydi, shuning uchun qisqartirib qoldirdim
    const calendarGrid = document.querySelector(".calendar-grid");
    const selectedDateElement = document.getElementById("selectedDate");
    const timeSlots = document.querySelectorAll(".time-slot");

    const currentDate = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    selectedDateElement.textContent = currentDate.toLocaleDateString("en-US", options);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(firstDayOfMonth);
      date.setDate(firstDayOfMonth.getDate() + i);
      const dayButton = document.createElement("button");
      dayButton.className = "calendar-day";
      dayButton.textContent = date.getDate();
      if (date.toDateString() === currentDate.toDateString()) dayButton.classList.add("selected");
      dayButton.addEventListener("click", () => {
        document.querySelectorAll(".calendar-day.selected").forEach((day) => day.classList.remove("selected"));
        dayButton.classList.add("selected");
        selectedDateElement.textContent = date.toLocaleDateString("en-US", options);
      });
      calendarGrid.appendChild(dayButton);
    }

    timeSlots.forEach((slot) => {
      slot.addEventListener("click", () => {
        timeSlots.forEach((s) => s.classList.remove("selected"));
        slot.classList.add("selected");
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      document.getElementById(target).classList.add('active');
    });
  });
});


var swiper = new Swiper(".resultSwiper", {
  slidesPerView: 1.3,
  spaceBetween: 6,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 26,
    },
  },
});

let slider = document.getElementById("range");
let value = document.querySelector(".value");
if (value) {
  value.innerHTML = slider.value;
}

function calcValue() {
  if (slider) {
    valuePercentage = (slider.value / slider.max)*100;
    slider.style.background = `linear-gradient(to right, #8758FF ${valuePercentage}%, #ebe9e7 ${valuePercentage}%)`;
  }
}

if (slider) {
  slider.addEventListener('input', function(){
    calcValue();
    value.textContent = this.value;
  })
}

calcValue();