function generateDateRange(startDate, endDate) {
  // 外部もぢゅーる見えない
  const dates = [];

  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  while (currentDate <= endDate) {
    dates.push(currentDate);

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 // Will increase month if over range
    );

    // Give a progress update.
    // dayjs
    // const progress = Math.round((i / list.length) * 100);
    // if (progress != previousProgress) {
    //   postMessage({messageType: 'DateProgress', data: progress, id});
    //   previousProgress = progress;
    // }
  }

  dates.pop();
  return dates;
}
