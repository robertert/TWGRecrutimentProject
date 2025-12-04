export const formatTime = (timeInSeconds: number) => {
  if (!timeInSeconds || !Number.isFinite(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  return number.toString();
};
