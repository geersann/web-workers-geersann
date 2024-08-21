const inputNumber = document.getElementById('inputNumber');
const resultDiv = document.getElementById('result');

let worker;

function terminateWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
    }
}

function calculate() {
    const number = parseInt(inputNumber.value);

    resultDiv.innerText = 'Calculating...';

    terminateWorker();

    worker = new Worker('worker.js');

    worker.postMessage({ data: number });

    worker.onmessage = function (event) {
        resultDiv.innerText = `Result: ${event.data}`;
        terminateWorker();
    };
}
