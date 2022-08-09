importScripts('index.js');

onmessage = function (event) {
  const dates = generateDateRange(
    event.data.from,
    event.data.to,
    event.data.id
  );
  postMessage({messageType: 'DateList', data: dates, id: event.data.id});
};
