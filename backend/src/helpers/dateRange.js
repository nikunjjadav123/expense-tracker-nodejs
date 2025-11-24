// It returns the start date and end date of a given month.
exports.getDateRangeOfMonth = (year, month) => {
    const startDate = new Date(year, month - 1, 1); // month is 0-indexed
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // last day of the month
    return { startDate, endDate };
}