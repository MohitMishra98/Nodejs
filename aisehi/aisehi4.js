// Task 1
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("User data");
    }, 1000);
  });
}

function fetchPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Posts data");
    }, 1000);
  });
}

async function fetchAllData() {
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
  console.log(user);
  console.log(posts);
}
// Task 2
function fetchSuccess() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });
}

function fetchFailure() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error occurred");
    }, 1000);
  });
}

async function handlePromises() {
  try {
    const [a, b] = await Promise.all([fetchSuccess(), fetchFailure()]);
  } catch (error) {
    console.log(error);
  }
}

// Task 3
async function fetchWithTimeout(promise, timeout) {
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve("Timeout exceeded"), timeout);
  });

  // Race the main promise against the timeout
  return Promise.race([promise, timeoutPromise]);
}

function fetchData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data fetched"), 3000)
  );
}
