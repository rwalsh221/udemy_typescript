const names: Array<string> = ['max', 'richard'];
names.push();

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is done');
  }, 2000);
});

promise.then((data) => {
  data.split(' ');
});
