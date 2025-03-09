let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("addTaskBtn").addEventListener("click", function () {
    const taskName = document.getElementById("taskInput").value.trim();
    const priority = document.getElementById("prioritySelect").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!taskName) {
        alert("❌ Please enter a task name.");
        return;
    }

    if (!dueDate) {
        alert("📅 Please select a due date.");
        return;
    }

    const task = { name: taskName, priority: priority, date: dueDate, completed: false };
    tasks.push(task);
    saveTasks();
    updateTaskList();
    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item task-item d-flex justify-content-between align-items-center";

        let priorityBadge = "";
        if (task.priority === "low") priorityBadge = '<span class="badge bg-secondary">Low</span>';
        if (task.priority === "medium") priorityBadge = '<span class="badge bg-warning">Medium</span>';
        if (task.priority === "high") priorityBadge = '<span class="badge bg-danger">High</span>';

        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
            ${priorityBadge} <span class="badge bg-info">${task.date}</span>
            <div>
                <button class="btn btn-success btn-sm" onclick="markComplete(${index})">✔ Complete</button>
                <button class="btn btn-warning btn-sm" onclick="editTask(${index})">✏ Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">🗑 Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    document.getElementById("taskCount").textContent = `Total tasks: ${tasks.length}`;
}

function markComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    updateTaskList();
}
function editTask(index) {
  const newTaskName = prompt("✏ Edit Task:", tasks[index].name);
  if (newTaskName !== null && newTaskName.trim() !== "") {
      tasks[index].name = newTaskName.trim();
      saveTasks();
      updateTaskList();
  }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    updateTaskList();
}

updateTaskList();
