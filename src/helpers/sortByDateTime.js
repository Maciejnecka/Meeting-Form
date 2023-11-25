export const sortByDateTime = (meetings) =>
  meetings.sort(
    (a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time)
  );

export const parseDateTime = (date, time) => new Date(`${date} ${time}`);
