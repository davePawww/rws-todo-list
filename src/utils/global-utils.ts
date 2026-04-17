const getDueDateLabel = (date: Date): string => {
  const now = new Date();
  const input = new Date(date);

  const normalizedDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const inputDay = normalizedDate(input);
  const today = normalizedDate(now);

  if (inputDay < today) return 'Expired';
  if (inputDay.getTime() === today.getTime()) return 'Today';

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  if (inputDay >= startOfWeek && inputDay <= endOfWeek) return 'This Week';

  return 'Upcoming';
};

const capitalizeFirstLetter = (value: string): string => {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
};

export { getDueDateLabel, capitalizeFirstLetter };
