function findPrimes(fromNumber, toNumber, id) {
  // Create an array containing all integers between the two specified numbers.
  const list = [];
  for (let i = fromNumber; i <= toNumber; i++) {
    if (i > 1) {
      list.push(i);
    }
  }

  // Test for primes.
  // エラトステネスの篩
  const maxDiv = Math.round(Math.sqrt(toNumber));
  const primes = [];

  let previousProgress;

  for (let i = 0; i < list.length; i++) {
    let failed = false;
    for (let j = 2; j <= maxDiv; j++) {
      if (list[i] != j && list[i] % j == 0) {
        failed = true;
      } else if (j == maxDiv && failed == false) {
        primes.push(list[i]);
      }
    }

    // Give a progress update.
    const progress = Math.round((i / list.length) * 100);
    if (progress != previousProgress) {
      postMessage({messageType: 'Progress', data: progress, id});
      previousProgress = progress;
    }
  }

  return primes;
}
