/**
 * Returns an array of Date objects representing the days of the specified month and year.
 *
 * @param {number} year - The year for which the days of the month are to be retrieved.
 * @param {number} month - The month for which the days are to be retrieved.
 * @return {Array<Date>} An array of Date objects representing the days of the month.
 */
export function getDaysOfMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const days = [];
  while (firstDayOfMonth.getMonth() === month) {
    days.push(new Date(firstDayOfMonth));
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
  return days;
}

/**
 * Returns an array of arrays, each representing a week of the specified month and year.
 *
 * @param {number} year - The year for which the weeks are to be retrieved.
 * @param {number} month - The month for which the weeks are to be retrieved.
 * @return {Array<Array<Date>>} An array of arrays, each containing Date objects representing the days of a week.
 */
export function getWeeksOfMonth(year, month) {
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

  /**
   * A function that adjusts the first week of a month if needed.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Adjusts the last week of a month if needed.
   *
   * @return {void} This function does not return anything.
   */
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

/**
 * Returns a string representing the month and year in a specified locale.
 *
 * @param {number} year - The year for which the month and year are to be formatted.
 * @param {number} month - The month for which the month and year are to be formatted.
 * @return {string} A formatted string representing the month and year.
 */
export function getMonthAndYearWithLocale(year, month) {
  return `${new Date(year, month).toLocaleString("default", {
    month: "long",
  })} ${year}`;
}

/**
 * Returns an array of month names in the specified locale.
 *
 * @return {Array<string>} An array of month names.
 */
export function getMonthsWithLocale() {
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    months.push(date.toLocaleString("default", { month: "long" }));
  }

  return months;
}

/**
 * Returns an array of localized day names for each day of the week.
 *
 * @return {Array<string>} An array of localized day names.
 */
export function getDaysOfWeekWithLocale() {
  debugger;
  const days = [];
  const date = new Date();

  for (let i = 0; i < 7; i++) {
    days.push({
      index: date.getDay(),
      name: date.toLocaleString("default", { weekday: "short" }),
    });
    date.setDate(date.getDate() + 1);
  }

  days.sort((a, b) => a.index - b.index);

  const sortedDays = days.map((day) => day.name);

  return sortedDays;
}
