export const formatTime = (timeInSeconds: number) => {
  if (!timeInSeconds || !Number.isFinite(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const formatTimeDate = (rawDate: Date) => {
  const hours = rawDate.getHours().toString().padStart(2, "0");
  const minutes = rawDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  return number.toString();
};

export const mapSortBy = (sortBy?: string) => {
  if (!sortBy) return "viewCount";
  switch (sortBy) {
    case "Most popular":
      return "viewCount";
    case "Upload date: latest":
      return "date";
    case "Upload date: oldest":
      return "date";
    default:
      return "viewCount";
  }
};

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
