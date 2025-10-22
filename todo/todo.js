const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    console.log(JSON.parse(dataJSON));
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Tasks added successfully");
};

const listTasks = () => {
  const tasks = loadTasks();
  console.log("==============");
  console.log("Your Tasks : ");
  console.log("==============");
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ` + task.task);
  });
  console.log("==============");
};

const removeTask = (idx) => {
  idx--;
  let tasks = loadTasks();
  tasks = tasks.filter((task, index) => index !== idx);
  saveTasks(tasks);
  console.log(`Task ${idx + 1} removed`);
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("command not found");
}
