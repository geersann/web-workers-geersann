document.addEventListener('DOMContentLoaded', function() {
    const inputNumber = document.getElementById('inputNumber');
    const resultDiv = document.getElementById('result');

    let worker;

    function initializeWorker() {
        if (worker) {
            worker.terminate();
        }
        worker = new Worker('worker.js');

        worker.onmessage = function (event) {
            console.log('Main thread received result:', event.data);
            resultDiv.innerText = `Result: ${event.data}`;
        };

        worker.onerror = function (error) {
            console.error('Worker error:', error.message);
            resultDiv.innerText = 'Error in worker';
            worker.terminate();
            worker = null;
        };
    }

    function terminateWorker() {
        if (worker) {
            worker.terminate();
            worker = null;
        }
    }

    function calculate() {
        const number = parseInt(inputNumber.value);

        if (isNaN(number)) {
            resultDiv.innerText = 'Invalid input';
            return;
        }

        resultDiv.innerText = 'Calculating...';

        if (!worker) {
            initializeWorker();
        }

        worker.postMessage({ data: number });
    }

    window.calculate = calculate;
});