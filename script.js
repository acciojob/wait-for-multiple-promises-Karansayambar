document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("output");

    // Function to create a promise with a random resolve time between 1 and 3 seconds
    const createPromise = () => {
        const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(randomTime / 1000); // Resolve with the time taken in seconds
            }, randomTime);
        });
    };

    // Create an array of three promises
    const promises = [createPromise(), createPromise(), createPromise()];

    // Use Promise.all to wait for all promises to resolve
    Promise.all(promises)
        .then(results => {
            // Populate the table with the required values
            for (let i = 0; i < 3; i++) {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);

                cell1.innerHTML = `Promise ${i + 1}`;
                cell2.innerHTML = `${results[i].toFixed(3)}s`;
            }

            // Calculate the total time taken to resolve all promises
            const totalTime = results.reduce((acc, time) => acc + time, 0);
            const totalRow = table.insertRow();
            const totalCell1 = totalRow.insertCell(0);
            const totalCell2 = totalRow.insertCell(1);
            totalCell1.innerHTML = "Total";
            totalCell2.innerHTML = `${totalTime.toFixed(3)}s`;
        })
        .catch(error => {
            console.error(error);
        });
});
