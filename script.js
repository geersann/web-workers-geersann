document.addEventListener('DOMContentLoaded', function() {
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

        if (isNaN(number)) {
            resultDiv.innerText = 'Invalid input';
            return;
        }

        resultDiv.innerText = 'Calculating...';

        terminateWorker();

        worker = new Worker('worker.js');

        worker.postMessage({ data: number });

        worker.onmessage = function (event) {
            console.log('Main thread received result:', event.data);
            resultDiv.innerText = `Result: ${event.data}`;
            terminateWorker();
        };
    }
    window.calculate = calculate;
});
