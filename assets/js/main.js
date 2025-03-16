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

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const progress = document.querySelector('.progress');
    const nextBtn = document.querySelector('.next-btn');
    const sections = document.querySelectorAll('.section');
    const bottomBar = document.querySelector('.bottom-bar');
    const sectionLinks = document.querySelectorAll('.section-link');
    const allOptionBtns = document.querySelectorAll('.option-btn');

    if (steps.length) {
        // Step va sectionlar bog‘lanishi
        const stepSections = {
            'Job details': ['tvSize', 'wallType', 'extraServices', 'hardware', 'additionalTV'],
            'Date and time': ['dateWorks'],
            'Location': ['installationAddress'],
            'Done!': ['booking', 'congrats']
        };

        let currentStep = 0;
        let currentSectionIndex = 0;
        const initialProgress = 12; // Boshlang‘ich 12%
        const jobDetailsSections = stepSections['Job details'].length; // 5 ta section
        const progressToDate = (32 - initialProgress) / jobDetailsSections; // Har bir Job details qadami

        // Boshlang‘ich holat
        progress.style.width = `${initialProgress}%`; // Dastlab 12%
        showSection(stepSections['Job details'][0]);
        updateNextButtonState();

        // Option-btn lar uchun hodisa
        allOptionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const parentOptions = btn.closest('.options');
                parentOptions.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateNextButtonState();
            });
        });

        // Next button hodisasi
        nextBtn.addEventListener('click', () => {
            const stepNames = Object.keys(stepSections);

            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                const currentSectionId = sections[currentSectionIndex].id;

                // Stepni yangilash (UI uchun)
                for (let i = 0; i < stepNames.length; i++) {
                    if (stepSections[stepNames[i]].includes(currentSectionId)) {
                        if (currentStep !== i) {
                            currentStep = i;
                            updateStepIndicators();
                        }
                        break;
                    }
                }

                // Progressni yangilash
                updateProgress(currentSectionId);

                showSection(currentSectionId);
                updateSectionLink(currentSectionId);
                updateNextButtonState();

                if (currentSectionId === 'booking') {
                    nextBtn.textContent = 'Finish';
                }

                if (currentSectionId === 'congrats') {
                    bottomBar.style.display = 'none';
                }
            }
        });

        // Progressni yangilash
        function updateProgress(currentSectionId) {
            let newWidth;

            if (stepSections['Job details'].includes(currentSectionId)) {
                const indexInJobDetails = stepSections['Job details'].indexOf(currentSectionId);
                newWidth = initialProgress + (indexInJobDetails * progressToDate);
            } else if (currentSectionId === 'dateWorks') {
                newWidth = 38; // Date and time da 50%
            } else if (currentSectionId === 'installationAddress') {
                newWidth = 75; // Location da 75%
            } else if (currentSectionId === 'booking') {
                newWidth = 87.5; // Booking da 87.5%
            } else if (currentSectionId === 'congrats') {
                newWidth = 100; // Congrats da 100%
            }

            progress.style.width = `${newWidth}%`;
        }

        // Step indikatorlarini yangilash
        function updateStepIndicators() {
            steps.forEach((step, index) => {
                if (index <= currentStep) {
                    step.classList.add('active');
                    step.querySelector('.step-name').classList.add('active');
                } else {
                    step.classList.remove('active');
                    step.querySelector('.step-name').classList.remove('active');
                }
            });
        }

        // Sectionni ko‘rsatish
        function showSection(sectionId) {
            sections.forEach(section => {
                section.classList.toggle('show', section.id === sectionId);
            });
        }

        // Section-link ni yangilash
        function updateSectionLink(currentSectionId) {
            sectionLinks.forEach(link => {
                const linkId = link.id.replace('Link', '');
                if (linkId === currentSectionId) {
                    link.classList.remove('hide');
                } else {
                    link.classList.add('hide');
                }
            });
        }

        // Next button holatini yangilash
        function updateNextButtonState() {
            const currentSection = sections[currentSectionIndex];
            const optionBtns = currentSection.querySelectorAll('.option-btn');

            if (optionBtns.length > 0) {
                const hasActive = Array.from(optionBtns).some(btn => btn.classList.contains('active'));
                nextBtn.disabled = !hasActive;
            } else {
                nextBtn.disabled = false;
            }
        }

        // Kalendar uchun kod
        const calendarGrid = document.querySelector('.calendar-grid');
        const selectedDateElement = document.getElementById('selectedDate');
        const timeSlots = document.querySelectorAll('.time-slot');

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        selectedDateElement.textContent = currentDate.toLocaleDateString('en-US', options);

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        for (let i = 0; i < daysInMonth; i++) {
            const date = new Date(firstDayOfMonth);
            date.setDate(firstDayOfMonth.getDate() + i);

            const dayButton = document.createElement('button');
            dayButton.className = 'calendar-day';
            dayButton.textContent = date.getDate();

            if (date.getDate() === currentDate.getDate() &&
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear) {
                dayButton.classList.add('selected');
            }

            dayButton.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day.selected')
                    .forEach(day => day.classList.remove('selected'));
                dayButton.classList.add('selected');
                selectedDateElement.textContent = date.toLocaleDateString('en-US', options);
            });

            calendarGrid.appendChild(dayButton);
        }

        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            });
        });
    }
});
