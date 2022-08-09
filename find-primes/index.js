import Reef from 'reefjs';
import Juicr from 'juicr.js';

const juicr = new Juicr({initialState: {queue: []}});

let searchDom;

window.onload = function () {
  searchDom = document.querySelector('.search');
  searchDom.addEventListener('click', doSearch);
};

function getUUID() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

function doSearch() {
  // searchDom.disabled = true;

  const fromNumber = document.getElementById('from').value;
  const toNumber = document.getElementById('to').value;

  const uuid = getUUID();

  const worker = new Worker('findPrimesWorker.js');
  worker.onmessage = receivedWorkerMessage;
  worker.onerror = (e) => {
    workerError({error: e, id: uuid});
  };

  juicr._state.queue.push({
    worker,
    id: uuid,
    message:
      'A web worker is on the job (' + fromNumber + ' to ' + toNumber + ') ...',
  });

  worker.postMessage({from: fromNumber, to: toNumber, id: uuid});

  juicr.dispatch('addItem');
}

function showUp(primeList) {
  let result = '';
  for (let i = 0; i < primeList.length; i++) {
    result += primeList[i];
    if (i !== primeList.length - 1) {
      result += ', ';
    }
  }
  return result;
}

function handlePrimeList(message) {
  const primes = message.data;
  const itemId = message.id;

  juicr._state.queue.map((item) => {
    if (item.id === itemId) {
      return Object.assign(item, {primes});
    } else {
      return item;
    }
  });

  juicr._state.queue.map((item) => {
    if (item.id === itemId && primes.length === 0) {
      return Object.assign(item, {
        message: 'Search failed to find any results.',
      });
    } else {
      return Object.assign(item, {message: 'The results are here!'});
    }
  });

  jobItem.render();

  // searchDom.disabled = false;
}

function handleProgress(message) {
  const itemId = message.id;
  juicr._state.queue.map((item) => {
    if (item.id === itemId) {
      return Object.assign(item, {
        message: message.data + '% done ...',
      });
    } else {
      return item;
    }
  });
  jobItem.render();
}

function receivedWorkerMessage(event) {
  const message = event.data;

  switch (message.messageType) {
    case 'PrimeList':
      handlePrimeList(message);
      break;
    case 'Progress':
      handleProgress(message);
      break;

    default:
      break;
  }
}

function workerError(error, itemId) {
  juicr._state.queue.map((item) => {
    if (item.id === itemId) {
      return Object.assign(item, {
        message: error.message,
      });
    } else {
      return item;
    }
  });
}

function cancelSearch(itemId) {
  juicr._state.queue.map((item) => {
    if (item.id === itemId) {
      item.worker.terminate();
      item.worker = null;
      return item;
    } else {
      return item;
    }
  });

  juicr._state.queue = juicr._state.queue.filter((item) => {
    return item.id !== itemId;
  });

  jobItem.render();

  // searchDom.disabled = false;
}

const app = new Reef('#app', {
  data: {},
  template: function (props) {
    const html = `
      <div class="workspace">
      </div>
    `;
    return html;
  },
});

const jobItem = new Reef('.workspace', {
  data: app.data,
  template: (props) => {
    return `
      ${juicr._state.queue
        .map((item, index) => {
          return `
<div class="item" data-item-id="${item.id}">
  <div class="status">${item.message}</div>
  <button class="cancel">Cancel</button>
  <div class="prime-area">${showUp(item.primes || [])}</div>
</div>
`;
        })
        .join('')}
`;
  },
  attachTo: [app],
});

juicr.action('addItem', (state, props) => {
  jobItem.render();

  const itemDomList = [...document.querySelectorAll('.item')];
  for (let index = 0; index < itemDomList.length; index++) {
    const itemDom = itemDomList[index];
    const cancelButtonDom = itemDom.querySelector('.cancel');
    const itemDomId = itemDom.getAttribute('data-item-id');
    cancelButtonDom.addEventListener('click', (e) => {
      cancelSearch(itemDomId);
    });
  }
});

app.render();
