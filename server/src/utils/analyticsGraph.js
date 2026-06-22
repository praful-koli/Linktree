export const getLast7DaysDates = () => {
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const formattedDate = date.toISOString().split("T")[0];

    dates.push({
      date: formattedDate,
      clicks: 0,
    });
  }

  return dates;
};