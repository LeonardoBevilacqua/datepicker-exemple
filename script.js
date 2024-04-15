//#region Utils
function getDaysOfMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const days = [];
  while (firstDayOfMonth.getMonth() === month) {
    days.push(new Date(firstDayOfMonth));
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
  return days;
}

function getWeeksOfMonth(year, month) {
  const days = getDaysOfMonth(year, month);
  const weeks = [];
  let currentWeek = [];

  for (const day of days) {
    if (currentWeek.length === 0 || day.getDay() === 0) {
      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
      currentWeek = [day];
    } else {
      currentWeek.push(day);
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  AdjustFirstWeek();

  adjustLastWeek();

  return weeks;

  function AdjustFirstWeek() {
    const firstDay = days[0].getDay();
    if (firstDay === 0) {
      return;
    }

    const firstWeek = weeks[0];
    const prevMonth = new Date(year, month - 1, 1);
    const prevMonthDays = getDaysOfMonth(
      prevMonth.getFullYear(),
      prevMonth.getMonth()
    ).length;
    const daysToAdd = 7 - firstWeek.length;
    let missingDay = 0;
    for (let i = prevMonthDays - daysToAdd; i < prevMonthDays; i++) {
      firstWeek.splice(
        missingDay++,
        0,
        new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i + 1)
      );
    }
  }

  function adjustLastWeek() {
    const lastDay = days[days.length - 1].getDay();
    const lastWeek = weeks[weeks.length - 1];
    if (lastDay === 6 && lastWeek.length === 7) {
      return;
    }
    const nextMonth = new Date(year, month + 1, 1);
    const daysToAdd = 6 - lastDay;
    for (let i = 1; i <= daysToAdd; i++) {
      lastWeek.push(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i));
    }
  }
}

function displayCalendar() {
  const weeks = getWeeksOfMonth(year, month);
  const calendarElem = document.getElementById("calendar");
  const yearAndMonthElem = document.getElementById("yearAndMonth");

  calendarElem.innerHTML = "";
  yearAndMonthElem.textContent = getMonthAndYearWithLocale();

  for (let week of weeks) {
    const weekElem = document.createElement("tr");
    for (let day of week) {
      const dayElem = document.createElement("td");
      dayElem.textContent = day.getDate();
      weekElem.appendChild(dayElem);
    }
    calendarElem.appendChild(weekElem);
  }
}

function getMonthAndYearWithLocale() {
  return `${new Date(year, month).toLocaleString("default", {
    month: "long",
  })} ${year}`;
}

function getMonthsWithLocale() {
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    months.push(date.toLocaleString("default", { month: "long" }));
  }

  return months;
}

function getDaysOfWeekWithLocale() {
  const days = [];
  const date = new Date();

  for (let i = 0; i < 7; i++) {
    date.setDate(date.getDate() + (i + 1));
    days.push({
      index: date.getDay(),
      name: date.toLocaleString("default", { weekday: "long" }),
    });
  }

  days.sort((a, b) => a.index - b.index);

  const sortedDays = days.map((day) => day.name);

  return sortedDays;
}
//#endregion

//#region Main
const yearElem = document.getElementById("year");
const monthElem = document.getElementById("month");
const daysOfWeekElem = document.getElementById("daysOfWeek");
const dateElem = document.getElementById("date");

let year = 2024;
let month = 3;

getMonthsWithLocale().forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = month;
  monthElem.appendChild(option);
});
getDaysOfWeekWithLocale().forEach((day) => {
  const header = document.createElement("th");
  header.innerHTML = day;
  daysOfWeekElem.appendChild(header);
});

yearElem.value = year;
monthElem.value = month;
dateElem.value = getMonthAndYearWithLocale();

yearElem.addEventListener("change", () => {
  year = parseInt(yearElem.value);
  displayCalendar();
  dateElem.value = getMonthAndYearWithLocale();
});
monthElem.addEventListener("change", () => {
  month = parseInt(monthElem.value);
  displayCalendar();
  dateElem.value = getMonthAndYearWithLocale();
});

displayCalendar();
//#endregion
