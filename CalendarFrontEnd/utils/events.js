export const createEvent = formData => {
  const event = Object.assign({}, formData);
  event.start = event.start.valueOf();
  event.end = event.end.valueOf();

  return $.ajax({
    method: 'POST',
    url: 'api/events',
    data: { event }
  })
};
