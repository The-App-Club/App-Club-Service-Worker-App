importScripts('findPrimes.js');

onmessage = function (event) {
  const {fromNumber, toNumber, id} = event.data;

  const primes = findPrimes(
    event.data.fromNumber,
    event.data.toNumber,
    event.data.id
  );
  postMessage({
    primeInfoList: primes,
    id: event.data.id,
  });
};
