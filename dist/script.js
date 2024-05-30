function calculateAge() {
  const day = document.getElementById("dayInput").value.trim();
  const month = document.getElementById("monthInput").value.trim();
  const year = document.getElementById("yearInput").value.trim();

  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  const currentDate = new Date();

  const maxDaysInMonth = [
    0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];

  document.getElementById("dayInputErrorMessage").innerText = "";
  document.getElementById("monthInputErrorMessage").innerText = "";
  document.getElementById("yearInputErrorMessage").innerText = "";
  document.getElementById("years").innerText = "--";
  document.getElementById("months").innerText = "--";
  document.getElementById("days").innerText = "--";
  document.getElementById("totaldays").innerText = "--";
  document.getElementById("dayInput").classList.remove("error");
  document.getElementById("monthInput").classList.remove("error");
  document.getElementById("yearInput").classList.remove("error");

  if (dayNum == 29 && monthNum == 2) {
    if (
      yearNum % 4 !== 0 ||
      (yearNum % 100 === 0 && yearNum % 400 !== 0)
    ) {
      document.getElementById("dayInputErrorMessage").innerText =
        "Invalid day for February";
      document.getElementById("dayInput").classList.add("error");
      document.getElementById("monthInputErrorMessage").innerText =
        "Invalid month";
      document.getElementById("monthInput").classList.add("error");
      document.getElementById("yearInputErrorMessage").innerText =
        "Not a leap year";
      document.getElementById("yearInput").classList.add("error");
    }
    return;
  }

  if (
    !dayNum ||
    isNaN(dayNum) ||
    dayNum < 1 ||
    dayNum > maxDaysInMonth[monthNum] ||
    monthNum < 1 ||
    monthNum > 12 ||
    !yearNum ||
    !monthNum ||
    yearNum < 1000 ||
    yearNum > currentDate.getFullYear()
  ) {
    if (
      !dayNum ||
      isNaN(dayNum) ||
      dayNum < 1 ||
      dayNum > maxDaysInMonth[monthNum]
    ) {
      document.getElementById("dayInputErrorMessage").innerText =
        "Empty/Invalid day";
      document.getElementById("dayInput").classList.add("error");
    }
    if (
      !monthNum ||
      isNaN(monthNum) ||
      monthNum < 1 ||
      monthNum > 12 ||
      (monthNum === 2 && day > 29)
    ) {
      document.getElementById("monthInputErrorMessage").innerText =
        "Empty/Invalid month";
      document.getElementById("monthInput").classList.add("error");
    }
    if (
      !yearNum ||
      isNaN(yearNum) ||
      yearNum < 1000 ||
      yearNum > currentDate.getFullYear()
    ) {
      document.getElementById("yearInputErrorMessage").innerText =
        "Empty/Invalid year";
      document.getElementById("yearInput").classList.add("error");
    }
    return;
  }

  const dob = new Date(yearNum, monthNum - 1, dayNum);
  const ageInMilliseconds = currentDate - dob;
  const ageInYears = Math.floor(
    ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
  );
  const remainingDays = Math.floor(
    (ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
    (24 * 60 * 60 * 1000)
  );
  const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
  const remainingMonths = Math.floor(remainingDays / 30);
  const remainingDaysInMonth = remainingDays % 30;

  document.getElementById("years").innerText = ageInYears || "--";
  document.getElementById("months").innerText = remainingMonths || "--";
  document.getElementById("days").innerText =
    remainingDaysInMonth || "--";
  document.getElementById("totaldays").innerText = ageInDays || "--";
  document.getElementById("dayInput").classList.remove("error");
  document.getElementById("monthInput").classList.remove("error");
  document.getElementById("yearInput").classList.remove("error");
}

const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

const iconToggle = () => {
  moonIcon.classList.toggle("display-none");
  sunIcon.classList.toggle("display-none");
};

const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("display-none");
    return;
  }
  sunIcon.classList.add("display-none");
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }

  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};
sunIcon.addEventListener("click", () => {
  themeSwitch();
});
moonIcon.addEventListener("click", () => {
  themeSwitch();
});
themeCheck();

gsap.from(".inputs", {
  // scale: -1,
  y: -600,
  delay: 1,
  duration: 2,
})