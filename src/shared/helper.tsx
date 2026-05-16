export function getTotalYearOfExperience(
  currentDate = new Date(),
  beginDate = new Date('2018-09-01'),
) {
  const yearNum = (currentDate.getTime() - beginDate.getTime()) / 1000 / 60 / 60 / 24 / 365;
  return Math.round(yearNum);
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function highlightAchievement(text: string) {
  return text
    .split(/(Achievement)/gi)
    .map((part, idx) => (/Achievement/i.test(part) ? <b key={`${idx}-${part}`}>{part}</b> : part));
}

export function chunkArray<T>(array: T[], limit: number) {
  const arrayGroups = [];
  for (let i = 0; i < array.length; i += limit) {
    const tempArray = array.slice(i, i + limit);
    arrayGroups.push(tempArray);
  }
  return arrayGroups;
}

export function isUrl(value: string) {
  return /^https?:\/\//i.test(value);
}
