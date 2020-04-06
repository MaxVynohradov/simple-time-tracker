const splitTimePerHour = (tasks) => Array(24).fill(0).map((item, idx) => {
  const startOfHour = new Date().setHours(idx, 0, 0, 0);
  const endOfHour = new Date().setHours(idx, 59, 59, 999);
  const duration = tasks.reduce((acc, { startTime, endTime }) => {
    const startOfHourDuration = startTime.valueOf() > startOfHour
      ? startTime.valueOf()
      : startOfHour;
    const endOfHourDuration = endOfHour > endTime.valueOf()
      ? endTime.valueOf()
      : endOfHour;
    const msDuration = endOfHourDuration - startOfHourDuration;
    return acc + (msDuration < 0 ? 0 : Math.floor(msDuration / 60000));
  }, 0);
  return duration;
});

const generateChartData = (tasks) => splitTimePerHour(tasks)
  .map((item, idx) => ({ name: idx, minutes: item }));

export default generateChartData;
