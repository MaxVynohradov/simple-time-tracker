export const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : `${unit}`);

export const formatTimerCounter = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms / 3600000 - hours) * 60);
  const seconds = Math.floor(((ms / 3600000 - hours) * 60 - minutes) * 60);
  return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
};
