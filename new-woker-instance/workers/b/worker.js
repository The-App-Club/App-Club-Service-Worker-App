importScripts('index.js');

onmessage = function (event) {
  const primes = findPrimes(event.data.from, event.data.to, event.data.id);
  postMessage({messageType: 'PrimeList', data: primes, id: event.data.id});
};
