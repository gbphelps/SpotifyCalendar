export const createEvent = formData => {
  const event = Object.assign({}, formData);
  event.start = event.start.valueOf();
  event.end = event.end.valueOf();

  return $.ajax({
    method: 'POST',
    url: 'api/events',
    data: { event }
  });
};

export const getMonth = range => {
  const [start, end] = range;
  return $.ajax({
    method: 'GET',
    url: 'api/events/getMonth',
    data: { start, end }
  });
};

export const updateEvent = event => {
  return $.ajax({
    method: 'PATCH',
    url: `api/events/${event.id}`,
    data: { event }
  });
};

export const deleteEvent = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/events/${event.id}`,
    data: { id }
  });
};
