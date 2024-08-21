function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = function(event) {
    const inputData = event.data.data;
    const result = fibonacci(inputData);

    self.postMessage(result);
};
