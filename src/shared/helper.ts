export function getTotalYearOfExperience(
  currentDate = new Date(),
  beginDate = new Date('2018-09-01'),
) {
  const yearNum = (currentDate.getTime() - beginDate.getTime()) / 1000 / 60 / 60 / 24 / 365;
  return Math.round(yearNum);
}
