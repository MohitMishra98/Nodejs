function simulateAsyncTask() {
    console.log("Task started");
    setTimeout(() => {
        console.log("Task finished");
    }, 2000);
}

function sim(t){
    setTimeout(() => {
        console.log(`Task ${t} finished`)
    }, t*1000);
}

function simulateMultipleTasks() {
    sim(1)
    sim(2)
    sim(3)
}

function fetchDataWithCallback(callback) {
    setTimeout(() => {
        callback("Fetched data")
    }, 2000);
}


//
simulateAsyncTask()
simulateMultipleTasks()