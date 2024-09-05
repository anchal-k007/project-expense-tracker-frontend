/**
 * Converts a JS Date to string accepted by HTML date input.
 *  
 * Month in JS is indexed from 0, whereas HTML date input begins from 1.
 * 
 * HTML date input has a strict input type of yyyy-MM-dd
 * @param {Date} today 
 * @returns {String}
 */
export function getDateStringFromDate(today) {
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  if(month < 10) {
    month = "0" + month;
  }
  const date = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
  const dateString = `${year}-${month}-${date}`;
  return dateString
}

/**
 * Converts a HTML Date input string to JS Date object.
 *  
 * Month in JS is indexed from 0, whereas HTML date input begins from 1.
 * 
 * HTML date input has a strict input type of yyyy-MM-dd
 * @param {String} date 
 * @returns {Date}
 */
export function getDateFromDateString(date) {
  let [year, month, day] = date.split("-");
  month = +month; // convert string to number
  month -= 1; // adjust difference between date from datePicker and array indexing of months in js
  return new Date(year, month, day);
}