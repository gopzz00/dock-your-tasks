const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Fetch tasks from the backend API
async function fetchTasks() {
    const response = await fetch("http://localhost:5000/tasks");
    const tasks = await response.json();
    renderTasks(tasks);
}

// Render tasks to the UI
function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name;
        taskList.appendChild(li);
    });
}

// Add a task using the backend API
async function addTask() {
    const taskName = taskInput.value;
    if (!taskName) return;

    await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: taskName }),
    });

    taskInput.value = "";
    fetchTasks();
}

// Initial load
fetchTasks();
