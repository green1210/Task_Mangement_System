// Select elements
const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Retrieve tasks from localStorage or set default
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";
    taskItem.innerHTML = `
      <span>${task.text} (${task.category})</span>
      <div>
        <button class="completeBtn" data-index="${index}">${task.completed ? "Undo" : "Complete"}</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Add new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskCategory = categoryInput.value;

  if (taskText) {
    tasks.push({ text: taskText, category: taskCategory, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
    renderTasks();
    taskInput.value = ""; // Clear input field
  } else {
    alert("Please enter a task!");
  }
});

// Complete or delete task
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("completeBtn")) {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
    renderTasks();
  }

  if (e.target.classList.contains("deleteBtn")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1); // Remove task
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
    renderTasks();
  }
});

// Initial render
renderTasks();
