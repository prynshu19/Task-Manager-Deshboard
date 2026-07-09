const doc = document;
const body = doc.body;
const userInp = doc.querySelector("#user-name");
const startBtn = doc.querySelector("#start-btn");
const userNameHeading = doc.querySelector(".name");
const startDiv = doc.querySelector(".start-div");
const addBtn = doc.querySelector(".add");
const addMobBtn = doc.querySelector("#add-mob");
const addTaskForm = doc.querySelector(".add-task");
const closeTaskForm = doc.querySelector(".close");
const cleanAllTasks = doc.querySelector(".clean");
const cleanAllMobTasks = doc.querySelector("#clean-mob");
const taskForm = doc.querySelector(".task-form");
const submitTask = doc.querySelector(".task-submit");
const cardContainer = doc.querySelector(".cards");
const emptyTask = doc.querySelector(".empty");
const taskFromHeading = doc.querySelector(".task-form-h1");
const totalDiv = doc.querySelector(".total-task");
const pendingDiv = doc.querySelector(".pending-task");
const finishedDiv = doc.querySelector(".completed-task");
const taskTell = doc.querySelector(".tell-task");
const totalCount = doc.querySelector(".total-count");
const finishedCount = doc.querySelector(".finished-count");
const pendingCount = doc.querySelector(".pending-count");
const searchInput = doc.querySelector("#search-input");
const searchBtn = doc.querySelector("#search-button");
const themeBtn = doc.querySelector("#theme-btn");

let userName = localStorage.getItem("userName" || null);

let tasksArr = JSON.parse(localStorage.getItem("taskArr")) || [];

let finishedTasks = JSON.parse(localStorage.getItem("finishedTasks")) || [];

let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];

let editTaskId = null;

let taskView = localStorage.getItem("taskView") || "all";

let theme = localStorage.getItem("theme") || "light";

if (theme) {
  body.setAttribute("data-theme", theme);

  if (theme === "dark") {
    themeBtn.innerHTML = '<i class="ri-sun-fill"></i>';
  } else {
    themeBtn.innerHTML = '<i class="ri-moon-fill"></i>';
  }
}

if (userName === null) startDiv.style.display = "flex";
else {
  startDiv.style.display = "none";
  userNameHeading.innerText = userName;
}
userInp.focus();

switch (taskView) {
  case "all": {
    totalDiv.classList.add("task-view");
    pendingDiv.classList.remove("task-view");
    finishedDiv.classList.remove("task-view");
    taskTell.innerText = "All Task";
    break;
  }
  case "pending": {
    localStorage.setItem("taskView", taskView);
    pendingDiv.classList.add("task-view");
    totalDiv.classList.remove("task-view");
    finishedDiv.classList.remove("task-view");
    taskTell.innerText = "Pending Task";
    break;
  }
  case "finished": {
    finishedDiv.classList.add("task-view");
    pendingDiv.classList.remove("task-view");
    totalDiv.classList.remove("task-view");
    taskTell.innerText = "Finished Task";
    break;
  }
}

function taskCounter() {
  totalCount.innerText = tasksArr.length;
  pendingCount.innerText = pendingTasks.length;
  finishedCount.innerText = finishedTasks.length;
}
taskCounter();

function setUserName() {
  userName = userInp.value?.trim();
  if (userName === "") {
    alert("Name is required to start... ");
    return;
  }
  startDiv.style.display = "none";
  localStorage.setItem("userName", userName);
  userNameHeading.innerText = userName;
}

function filterTask() {
  pendingTasks = tasksArr.filter((ele) => ele.isCompleted === false);
  localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));

  finishedTasks = tasksArr.filter((ele) => ele.isCompleted === true);
  localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));
}
filterTask();

function showAllTasks() {
  if (tasksArr.length > 0) {
    cardContainer.innerHTML = "";
    if (taskView === "all") {
      tasksArr.forEach((ele) => {
        cardContainer.innerHTML += `    <div class="task-cards">
                        <div class="tasks-content">
                            <label class="checkbox">
                              <input
                               type="checkbox" ${ele.isCompleted ? "checked" : ""}
                               onchange="taskToggle(${ele.taskId})">
                               <span class="checkmark"></span>
                            </label>
                            <p>${ele.task} <span>(Due Date: ${ele.dueDate})</span></p>
                        </div>
                        <div class="tasks-btn">
                            <button onclick="editTask(${ele.taskId})" class="edit mobile btn">Edit</button>
                            <button onclick="dltTask(${ele.taskId})" class="dlt mobile btn">Delete</button>

                            <button onclick="editTask(${ele.taskId})" class="edit desktop btn">
                                <i class="ri-edit-box-line"></i></button>
                            <button onclick="dltTask(${ele.taskId})"  class="dlt desktop btn"><i class="ri-close-large-line"></i></button>
                        </div>
                    </div>
                </div>`;
      });
    }
    if (taskView === "pending") {
      if (pendingTasks.length > 0) {
        pendingTasks.forEach((ele) => {
          cardContainer.innerHTML += `    <div class="task-cards">
                        <div class="tasks-content">
                            <label class="checkbox">
                              <input
                               type="checkbox" ${ele.isCompleted ? "checked" : ""}
                               onchange="taskToggle(${ele.taskId})">
                               <span class="checkmark"></span>
                            </label>
                                (Pending Till: ${ele.startDate})
                            <p>${ele.task} <span>(Due Date: ${ele.dueDate})</span></p>
                        </div>
                        <div class="tasks-btn">
                            <button onclick="editTask(${ele.taskId})" class="edit mobile btn">Edit</button>
                            <button onclick="dltTask(${ele.taskId})" class="dlt mobile btn">Delete</button>

                            <button onclick="editTask(${ele.taskId})" class="edit desktop btn">
                                <i class="ri-edit-box-line"></i></button>
                            <button onclick="dltTask(${ele.taskId})"  class="dlt desktop btn"><i class="ri-close-large-line"></i></button>
                        </div>
                    </div>
                </div>`;
        });
      } else {
        cardContainer.innerHTML = "";
        cardContainer.innerHTML += `<div class="cards empty">
        <div class="empty-state">
          <i class="ri-inbox-line"></i>
          <h3>No Tasks Available</h3>
          <p>Create more task.</p>
        </div>
      </div>`;
      }
    }
    if (taskView === "finished") {
      if (finishedTasks.length > 0) {
        finishedTasks.forEach((ele) => {
          cardContainer.innerHTML += `    <div class="task-cards">
                        <div class="tasks-content">
                            <label class="checkbox">
                               Completed ✅
                            </label>
                            <p>${ele.task} <span>(Task Type: ${ele.taskType})</span></p>
                        </div>
                        <div class="tasks-btn">
                           
                            <button onclick="dltTask(${ele.taskId})" class="dlt mobile btn">Delete</button>

                            
                            <button onclick="dltTask(${ele.taskId})"  class="dlt desktop btn"><i class="ri-close-large-line"></i></button>
                        </div>
                    </div>
                </div>`;
        });
      } else {
        cardContainer.innerHTML = "";
        cardContainer.innerHTML += `<div class="cards empty">
        <div class="empty-state">
          <i class="ri-inbox-line"></i>
          <h3>No Tasks Available</h3>
          <p>Create More task.</p>
        </div>
      </div>`;
      }
    }
  } else {
    cardContainer.innerHTML = "";
    cardContainer.innerHTML += `<div class="cards empty">
        <div class="empty-state">
          <i class="ri-inbox-line"></i>
          <h3>No Tasks Available</h3>
          <p>Create your first task.</p>
        </div>
      </div>`;
  }
}
showAllTasks();

function dltTask(id) {
  let task = tasksArr.find((ele) => ele.taskId === id);
  tasksArr = tasksArr.filter((ele) => ele.taskId !== task.taskId);
  localStorage.setItem("taskArr", JSON.stringify(tasksArr));
  showAllTasks();
  filterTask();
  taskCounter();
}

function editTask(id) {
  let task = tasksArr.find((ele) => ele.taskId === id);
  addTaskForm.style.display = "flex";
  taskFromHeading.innerText = "Update Task";
  submitTask.innerText = "Update";

  taskForm[0].value = task.task;
  taskForm[1].value = task.startDate;
  taskForm[2].value = task.dueDate;
  taskForm[3].value = task.taskType;

  editTaskId = task.taskId;
}

function taskToggle(id) {
  let task = tasksArr.find((ele) => ele.taskId === id);
  task.isCompleted = !task.isCompleted;
  localStorage.setItem("taskArr", JSON.stringify(tasksArr));
  filterTask();
  showAllTasks();
  taskCounter();
}

function searchTask(val) {
  let task = null;
  if (taskView === "all") {
    task = tasksArr.filter(
      (ele) => ele.task.toLowerCase() === val.toLowerCase(),
    );
  }
  if (taskView === "pending") {
    task = pendingTasks.filter(
      (ele) => ele.task.toLowerCase() === val.toLowerCase(),
    );
  }
  if (taskView === "finished") {
    task = finishedTasks.filter(
      (ele) => ele.task.toLowerCase() === val.toLowerCase(),
    );
  }
  cardContainer.innerHTML = "";
  if (task.length > 0) {
    cardContainer.innerHTML = `<div class="task-cards">
                        <div class="tasks-content">
                            <label class="checkbox">
                              <input
                               type="checkbox" ${task[0].isCompleted ? "checked" : ""}
                               onchange="taskToggle(${task.taskId})">
                               <span class="checkmark"></span>
                            </label>
                            <p>${task[0].task} <span>(Due Date: ${task[0].dueDate})</span></p>
                        </div>
                        <div class="tasks-btn">
                            <button onclick="editTask(${task[0].taskId})" class="edit mobile btn">Edit</button>
                            <button onclick="dltTask(${task[0].taskId})" class="dlt mobile btn">Dtaskte</button>

                            <button onclick="editTask(${task[0].taskId})" class="edit desktop btn">
                                <i class="ri-edit-box-line"></i></button>
                            <button onclick="dltTask(${task[0].taskId})"  class="dlt desktop btn"><i class="ri-close-large-line"></i></button>
                        </div>
                    </div>
                </div>`;
  } else {
    cardContainer.innerHTML = "";
    cardContainer.innerHTML += `<div class="cards empty">
        <div class="empty-state">
          <i class="ri-inbox-line"></i>
          <h3>No Tasks Found</h3>
          <p>Create task.</p>
        </div>
      </div>`;
  }
}

startBtn.addEventListener("click", setUserName);

userInp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") setUserName();
});

addBtn.addEventListener("click", () => {
  addTaskForm.style.display = "flex";
  taskForm[0].focus();
});

addMobBtn.addEventListener("click", () => {
  addTaskForm.style.display = "flex";
  taskForm[0].focus();
});

closeTaskForm.addEventListener("click", () => {
  addTaskForm.style.display = "none";
  taskForm[0].value = "";
  taskForm[1].value = "";
  taskForm[2].value = "";
  taskForm[3].value = "Personal";
});

cleanAllTasks.addEventListener("click", () => {
  localStorage.removeItem("taskArr");
  localStorage.removeItem("finishedTasks");
  localStorage.removeItem("pendingTasks");
  tasksArr = [];
  filterTasks = [];
  pendingTasks = [];
  taskCounter();
});

cleanAllMobTasks.addEventListener("click", () => {
  localStorage.removeItem("taskArr");
  localStorage.removeItem("finishedTasks");
  localStorage.removeItem("pendingTasks");
  tasksArr = [];
  filterTasks = [];
  pendingTasks = [];
  taskCounter();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

submitTask.addEventListener("click", () => {
  let task = taskForm[0].value?.trim();
  let startDate = taskForm[1].value;
  let dueDate = taskForm[2].value;
  let taskType = taskForm[3].value;

  if (task === "" || startDate === "" || dueDate === "") {
    alert("Fill all the inputs");
    return;
  }

  let taskObj = {
    taskId: Date.now(),
    task,
    startDate,
    dueDate,
    taskType,
    isCompleted: false,
  };

  if (editTaskId === null) tasksArr.push(taskObj);
  else {
    let task = tasksArr.find((ele) => ele.taskId === editTaskId);

    if (taskForm[0] === "" || taskForm[1] === "" || taskForm[2] === "") {
      alert("Fill all the inputs");
      return;
    }

    let upDatedTask = {
      taskId: editTaskId,
      task: taskForm[0].value,
      startDate: taskForm[1].value,
      dueDate: taskForm[2].value,
      taskType: taskForm[3].value,
      isCompleted: task.isCompleted,
    };

    let index = tasksArr.findIndex((ele) => ele.taskId === editTaskId);

    editTaskId = null;

    tasksArr[index] = upDatedTask;
    taskForm[0].value = "";
    taskForm[1].value = "";
    taskForm[2].value = "";
    taskForm[3].value = "Personal";
  }

  localStorage.setItem("taskArr", JSON.stringify(tasksArr));
  taskForm[0].value = "";
  taskForm[1].value = "";
  taskForm[2].value = "";
  taskForm[3].value = "Personal";

  addTaskForm.style.display = "none";
  showAllTasks();
  filterTask();
  taskCounter();
});

totalDiv.addEventListener("click", () => {
  taskView = "all";
  localStorage.setItem("taskView", taskView);
  totalDiv.classList.add("task-view");
  pendingDiv.classList.remove("task-view");
  finishedDiv.classList.remove("task-view");
  taskTell.innerText = "All Task";
  showAllTasks();
  filterTask();
  taskCounter();
});

pendingDiv.addEventListener("click", () => {
  taskView = "pending";
  localStorage.setItem("taskView", taskView);
  pendingDiv.classList.add("task-view");
  totalDiv.classList.remove("task-view");
  finishedDiv.classList.remove("task-view");
  taskTell.innerText = "Pending Task";
  showAllTasks();
  filterTask();
  taskCounter();
});

finishedDiv.addEventListener("click", () => {
  taskView = "finished";
  localStorage.setItem("taskView", taskView);
  finishedDiv.classList.add("task-view");
  pendingDiv.classList.remove("task-view");
  totalDiv.classList.remove("task-view");
  taskTell.innerText = "Finished Task";
  showAllTasks();
  filterTask();
  taskCounter();
});

searchBtn.addEventListener("click", (e) => {
  if (searchInput.value?.trim()) {
    searchTask(searchInput.value?.trim());
  }
  searchInput.value = "";
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (searchInput.value?.trim()) {
      searchTask(searchInput.value?.trim());
    }
    searchInput.value = "";
  }
});

themeBtn.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = '<i class="ri-sun-fill"></i>';
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = '<i class="ri-moon-fill"></i>';
  }
});

/*Difference Between input.value and input.getAttribute("value")

1. input.value
   - Returns the current value of the input field.
   - If the user types something in input or JavaScript changes the value,
     input.value reflects the updated value.

2. input.getAttribute("value")
   - Returns the initial value written in the HTML attribute.
   - It does not change when the user changes the input field.*/
