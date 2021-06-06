function convertDate(date) {
  var dateParts = date.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

export default convertDate;
