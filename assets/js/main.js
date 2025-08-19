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

const slideRange = document.querySelector('.slide-range');

if (slideRange) {
  const slideInp = slideRange.querySelector('input[type="range"]');
  const text = slideRange.querySelector('.slide-range__value');

  const handleInput = () => {
    let min = parseInt(slideInp.min);
    let max = parseInt(slideInp.max);
    let val = parseInt(slideInp.value);
    let textVal = text.querySelector('.txt-in span');
    let percent = (val - min) * 100 / (max - min);

    textVal.innerText = val + ' in*';

    text.style.paddingLeft = text.getBoundingClientRect().width * percent / 100 -  textVal.getBoundingClientRect().width * percent / 100 + 'px';
  }

  handleInput();

  slideInp.oninput = () => handleInput();
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

const preparationStep = document.querySelector('.preparation-steps');
const preparationSwp = new Swiper('.preparation .swiper', {
  slidesPerView: 1,
  effect: 'fade',
  allowTouchMove: false,
  // initialSlide: 13,
})
const preparationSwpNextBtn = document.querySelectorAll('.preparation .swiper .next-btn');
const preparationSwpPrevBtn = document.querySelectorAll('.preparation .swiper .prev-btn');

if (preparationSwp) {
  for (let i = 1; i <= preparationSwp.slides.length; i++) {
    if (preparationSwp.activeIndex + 1 == i) {
      preparationStep.classList.add("active-" + i);
    } else {
      setTimeout(() => {
        preparationStep.classList.remove("active-" + i);
      }, 200)
    }
  }

  preparationSwp.on('slideChange', function (e) {
    for (let i = 1; i <= preparationSwp.slides.length; i++) {
      if (preparationSwp.activeIndex + 1 == i) {
        preparationStep.classList.add("active-" + i);
      } else {
        setTimeout(() => {
          preparationStep.classList.remove("active-" + i);
        }, 200)
      }
    }

    setTimeout(() => {
      const section = document.querySelector('.preparation');
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 100);
});
}

if (preparationSwpNextBtn.length) {
  preparationSwpNextBtn.forEach(el => {
    el.onclick = () => {
      preparationSwp.slideNext();
    }
  })
}

if (preparationSwpPrevBtn.length) {
  preparationSwpPrevBtn.forEach(el => {
    el.onclick = () => {
      preparationSwp.slidePrev();
    }
  })
}

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

    allOptionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parentOptions = btn.closest(".options");
        const sectionId = parentOptions.closest(".section").id;

        if (sectionId === "wallType" || sectionId === "extraServices") {
          btn.classList.toggle("active");
        } else {
          parentOptions.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        }

        updateNextButtonState();
      });
    });

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

    const prevSectionMap = {
      wallTypeLink: "tvSize",
      extraServicesLink: "wallType",
      hardwareLink: "extraServices",
      additionalTVLink: "hardware",
      dateWorksLink: "additionalTV",
      installationAddressLink: "dateWorks",
      bookingLink: "installationAddress",
      congratsLink: "booking",
      installationAddress: "dateWorks",
      booking: "installationAddress",
      congrats: "booking",
    };


    sectionLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const prevSectionId = prevSectionMap[link.id];
        if (!prevSectionId) return;

        currentSectionIndex = Array.from(sections).findIndex(
          (section) => section.id === prevSectionId
        );

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

        if (prevSectionId === "booking") {
          bottomBar.style.display = "flex";
        }
      });
    });

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

const reviewSwp = new Swiper('.review .swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  breakpoints: {
    992: {
      spaceBetween: 19,
      slidesPerView: 4,
    }
  },
  navigation: {
    nextEl: '.review .swp-btn__next',
    prevEl: '.review .swp-btn__prev',
  }
})

const reviewCard = document.querySelectorAll('.review .review-card');
const reviewModal = document.querySelector('.review-modal');
const reviewModalBtnClose = document.querySelector('.review-modal__close');
const reviewModalBg = document.querySelector('.review-modal__bg');
const reviewModalContent = document.querySelector('.review-modal__content-in');

if (reviewCard.length) {
  reviewCard.forEach(el => {
    const btn = el.querySelector('.more-link');
    btn.onclick = e => {
      e.preventDefault();
      reviewModalContent.innerHTML = el.outerHTML;
      reviewModal.classList.add('active');
    }
  })

  reviewModalBtnClose.onclick = () => {
    reviewModal.classList.remove('active');
  }

  reviewModalBg.onclick = () => {
    reviewModal.classList.remove('active');
  }
}

const priceOrderSwp = new Swiper('.price-order .swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'fade',
  // initialSlide: 5,
  // allowTouchMove: false,
})

const priceLine = document.querySelector('.price-order__head');

if (document.querySelector('.price-order .swiper')) {
  for(let i=0; i<priceOrderSwp.slides.length; i++) {
    if (i == priceOrderSwp.realIndex) {
      priceLine.classList.add(`active-${i}`);
    } else {
      priceLine.classList.remove(`active-${i}`);
    }
  }
  priceOrderSwp.on('slideChange', () => {
    window.scrollTo(0, 0);
    for(let i=0; i<priceOrderSwp.slides.length; i++) {
      if (i == priceOrderSwp.realIndex) {
        priceLine.classList.add(`active-${i}`);
      } else {
        priceLine.classList.remove(`active-${i}`);
      }
    }
  })
}

function priceOrderSwpSlideTO(idx) {
  if (document.querySelector('.price-order .swiper')) {
    priceOrderSwp.slideTo(idx);
  }
}

const calculation = document.querySelectorAll('.calculation');
if (calculation.length) {
  calculation.forEach(el => {
    const minus = el.querySelectorAll('.calculation-btn')[0];
    const plus = el.querySelectorAll('.calculation-btn')[1];
    const text = el.querySelector('.calculation-text');
    const inp = el.querySelector('.calculation-inp');

    plus.onclick = () => {
      text.textContent = parseInt(inp.value) + 1;
      inp.value = parseInt(inp.value) + 1;
      inp.dispatchEvent(new Event("input"));
    }

    minus.onclick = () => {
      if (parseInt(inp.value) >= 1) {
        text.textContent = parseInt(inp.value) - 1;
        inp.value = parseInt(inp.value) - 1;
        inp.dispatchEvent(new Event("input"));
      }
    }
  })
}

const wallAccordions = document.querySelectorAll('.add-wall__accordion');

if (wallAccordions.length) {
  wallAccordions.forEach(item => {
    const accBtn = item.querySelector('.add-wall__accordion-btn');
    const accBody = item.querySelector('.add-wall__accordion-body');
    const list = item.querySelectorAll('ul li');

    if (list.length) {
      list.forEach(data => {
        const inp = data.querySelector('.calculation-inp');
        inp.oninput = (e) => {
          if (parseInt(inp.value) >= 1) {
            data.classList.add('active');
          } else {
            data.classList.remove('active');
          }
        }
      })
    }

    if (item.classList.contains('active')) {
      accBody.style.maxHeight = accBody.scrollHeight + 'px';
    }

    accBtn.addEventListener('click', () => {
      item.classList.toggle('active');
      accBody.style.maxHeight = accBody.style.maxHeight ? null : accBody.scrollHeight + 'px';
    });
  })
}

const priceOrderStep1 = document.querySelectorAll('.price-order__step-validation');

if (priceOrderStep1.length) {
  priceOrderStep1.forEach(arr => {
    const checkboxes = arr.querySelectorAll('ul li input');
    const btn = arr.querySelector('.tv-size__foot .btn-orange');

    checkboxes.forEach(inp => {
      inp.onchange = () => {
        let disable = true;
        checkboxes.forEach(el => {
          if (el.checked) {
            disable = false;
          }
        })
        if (disable) {
          btn.classList.add('disabled');
        } else {
          btn.classList.remove('disabled')
        }
      }
    })
  })
}