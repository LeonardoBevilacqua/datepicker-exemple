import {
  getDaysOfWeekWithLocale,
  getMonthAndYearWithLocale,
  getMonthsWithLocale,
  getWeeksOfMonth,
} from "./date-utils.js";

//#region Utils

/**
 * Updates the calendar display based on the provided year and month.
 *
 * @param {number} year - The year for the calendar display.
 * @param {number} month - The month for the calendar display.
 */
function updateCalendarDisplay(year, month) {
  updateYearMonthElem(getMonthAndYearWithLocale(year, month));
  updateCalendarElem(generateCalendarRowsAndColumns(year, month));
}

/**
 * Initializes the calendar with default year and month values, updates the calendar display, and initializes various elements.
 *
 * @return {{yearElem: HTMLInputElement, monthElem: HTMLSelectElement}} An object containing the initialized year and month elements.
 */
function initCalendar() {
  const year = 2024;
  const month = 3;
  const yearElem = initYearElement(year);
  const monthElem = initMonthElement(month);

  updateCalendarDisplay(year, month);
  setDateElement(getMonthAndYearWithLocale(year, month));
  initDaysOfWeekElement();

  return { yearElem, monthElem };
}

/**
 * Updates the calendar element with the provided weeks elements.
 *
 * @param {HTMLTableRowElement[]} weeksElem - An array of table row elements representing the weeks of the calendar.
 * @param {string} [calendarId="calendar"] - The ID of the calendar element to update. Defaults to "calendar".
 * @return {void} This function does not return anything.
 */
function updateCalendarElem(weeksElem, calendarId = "calendar") {
  const calendarElem = document.getElementById(calendarId);
  calendarElem.innerHTML = "";
  weeksElem.forEach((weekElem) => calendarElem.appendChild(weekElem));
}

/**
 * Updates the year and month element with the provided content.
 *
 * @param {string} content - The content to be displayed in the year and month element.
 * @param {string} [yearAndMonthId="yearAndMonth"] - The ID of the year and month element. Defaults to "yearAndMonth".
 * @return {void} This function does not return anything.
 */
function updateYearMonthElem(content, yearAndMonthId = "yearAndMonth") {
  const yearAndMonthElem = document.getElementById(yearAndMonthId);
  yearAndMonthElem.textContent = content;
}

/**
 * Generates the rows and columns of a calendar for the given year and month.
 *
 * @param {number} year - The year of the calendar.
 * @param {number} month - The month of the calendar.
 * @return {HTMLTableRowElement[]} An array of table row elements representing the weeks of the calendar.
 */
function generateCalendarRowsAndColumns(year, month) {
  const weeks = getWeeksOfMonth(year, month);

  /**
   * @type {HTMLTableRowElement[]}
   */
  const weeksElem = [];
  weeks.forEach((week) => {
    const weekElem = document.createElement("tr");
    week.forEach((day) => {
      const dayElem = document.createElement("td");
      dayElem.textContent = day.getDate();
      weekElem.appendChild(dayElem);
    });
    weeksElem.push(weekElem);
  });
  return weeksElem;
}

/**
 * Initializes the month element with the provided month and month element ID.
 *
 * @param {number} month - The month to be initialized.
 * @param {string} [monthElemId="month"] - The ID of the month element. Defaults to "month".
 * @return {HTMLElement} - The initialized month element.
 */
function initMonthElement(month, monthElemId = "month") {
  const monthElem = document.getElementById(monthElemId);

  if (!monthElem) {
    throw Error(`Element with id ${monthElemId} not found`);
  }

  getMonthsWithLocale().forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthElem.appendChild(option);
  });

  monthElem.value = month;

  return monthElem;
}

/**
 * Initializes the year element with the provided year and element ID, setting the value of the element to the given year.
 *
 * @param {number} year - The year to be initialized.
 * @param {string} [yearElemId="year"] - The ID of the year element. Defaults to "year".
 * @return {HTMLElement} The initialized year element.
 */
function initYearElement(year, yearElemId = "year") {
  const yearElem = document.getElementById(yearElemId);

  if (!yearElem) {
    throw Error(`Element with id ${yearElemId} not found`);
  }

  yearElem.value = year;

  return yearElem;
}

/**
 * Initializes the days of the week element with the provided element ID.
 *
 * @param {string} [daysOfWeekElemId="daysOfWeek"] - The ID of the days of the week element. Defaults to "daysOfWeek".
 * @return {void} This function does not return anything.
 */
function initDaysOfWeekElement(daysOfWeekElemId = "daysOfWeek") {
  const daysOfWeekElem = document.getElementById(daysOfWeekElemId);

  getDaysOfWeekWithLocale().forEach((day) => {
    const header = document.createElement("th");
    header.innerHTML = day;
    daysOfWeekElem.appendChild(header);
  });
}

/**
 * Sets the value of the specified date element.
 *
 * @param {string} date - The date value to set.
 * @param {string} [dateElemId="date"] - The ID of the date element. Defaults to "date".
 * @return {void} This function does not return anything.
 */
function setDateElement(date, dateElemId = "date") {
  const dateElem = document.getElementById(dateElemId);
  dateElem.value = date;
}

/**
 * Handles the change event of the calendar.
 *
 * @param {HTMLElement} yearElem - The year input element of the calendar.
 * @param {HTMLElement} monthElem - The month select element of the calendar.
 * @return {void} This function does not return anything.
 */
function handleCalendarChange(yearElem, monthElem) {
  const year = parseInt(yearElem.value);
  const month = parseInt(monthElem.value);
  updateCalendarDisplay(year, month);
  setDateElement(getMonthAndYearWithLocale(year, month));
}
//#endregion

//#region Main
/**
 * Initializes event listeners for the calendar.
 */
const { yearElem, monthElem } = initCalendar();

// Add event listeners to year and month elements for "change" event
// to update calendar display and set the value of the date element
yearElem.addEventListener("change", () =>
  handleCalendarChange(yearElem, monthElem)
);
monthElem.addEventListener("change", () =>
  handleCalendarChange(yearElem, monthElem)
);

//#endregion
