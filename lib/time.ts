export const stringifyInterval = (start: Date, end: Date) => {
  const _MS_PER_SEC = 1000;
  var diff = Math.floor((end.getTime() - start.getTime()) / _MS_PER_SEC);
  if (diff <= 0) return "Ended!";
  if (diff < 60) {
    return diff + " seconds";
  } else if (diff < 60 * 60) {
    return Math.floor(diff / 60) + " minute";
  } else if (diff < 60 * 60 * 24) {
    return Math.floor(diff / (60 * 60)) + " hours";
  } else if (diff < 60 * 60 * 24 * 365) {
    return Math.floor(diff / (60 * 60 * 25)) + " days";
  }
};

export const reloadIfEnded = (start: Date, end: Date, callback: () => void) => {
  if (end.getTime() - start.getTime() < 0) {
    callback();
  }
};
