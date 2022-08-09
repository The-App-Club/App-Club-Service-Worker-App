import dayjs from 'dayjs';

function getUUID() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

window.onload = () => {
  init();
};

function init() {
  const uuid = getUUID();

  const aw = new Worker('workers/a/worker.js');
  aw.onmessage = receivedWorkerMessage;
  aw.onerror = (e) => {
    workerError({error: e, id: uuid});
  };

  const startDate = new Date(2020, 12, 1);
  const endDate = new Date();

  aw.postMessage({from: startDate, to: endDate, id: uuid});

  const bw = new Worker('workers/b/worker.js');
  bw.onmessage = receivedWorkerMessage;
  bw.onerror = (e) => {
    workerError({error: e, id: uuid});
  };

  const fromNum = 1;
  const toNum = 2000;

  bw.postMessage({from: fromNum, to: toNum, id: uuid});
}

function handleDateList(message) {
  console.log('handleDateList', message);
}

function handleDateProgress(message) {
  // console.log('handleDateProgress', message);
}

function handlePrimeList(message) {
  console.log('handlePrimeList', message);
}

function handlePrimeProgress(message) {
  // console.log('handlePrimeProgress', message);
}

function receivedWorkerMessage(event) {
  const message = event.data;

  switch (message.messageType) {
    case 'DateList':
      console.log(message);
      handleDateList(message);
      break;
    case 'PrimeList':
      console.log(message);
      handlePrimeList(message);
      break;
    case 'PrimeProgress':
      // console.log(message);
      handlePrimeProgress(message);
      break;
    case 'DateProgress':
      // console.log(message);
      handleDateProgress(message);
      break;
    default:
      break;
  }
}

function workerError(error, itemId) {
  console.log('workerError', error, itemId);
}
