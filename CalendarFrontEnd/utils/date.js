export const endOfMonth = now => {
  let date = new Date(now.valueOf());
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
}

export const firstWeekday = now => {
  let date = new Date(now.valueOf());
  date.setDate(1);
  return date.getDay();
}

export const months = {
  '0': 'January',
  '1': 'February',
  '2': 'March',
  '3': 'April',
  '4': 'May',
  '5': 'June',
  '6': 'July',
  '7': 'August',
  '8': 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December'
}

export const format = date => {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export const time = date => {
  const h = date.getHours();
  let hour = (h > 12 ? h - 12 : h);
  if (hour === 0) hour = 12;

  const suffix = (h >= 12 ? 'pm' : 'am');

  let minute = date.getMinutes();
  if (minute < 10) minute = '0' + minute;
  
  return `${hour}:${minute}${suffix}`
}
