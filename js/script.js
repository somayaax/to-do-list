const taskInput = document.getElementById('new')

let tasksContainer;
let finishedContainer;

if (localStorage.getItem("unfinished") == null) {
    tasksContainer = [];
} else {
    tasksContainer = JSON.parse(localStorage.getItem("unfinished"))
    display()
}
if (localStorage.getItem("finished") == null) {
    finishedContainer = [];
} else {
    finishedContainer = JSON.parse(localStorage.getItem("finished"))
    displayFinished();
}

function addTask() {
    if (taskInput.value != "") {
        tasksContainer.push(taskInput.value)
        localStorage.setItem("unfinished", JSON.stringify(tasksContainer))
        display()
    } else {
        alert("input required")
    }
}

function display() {
    let container = '';
    for (let i = 0; i < tasksContainer.length; i++) {
        container += `<div class="task-content">
        <div>
        <i class="check fa-solid fa-check" onclick="finishTask(${i})"></i>
        <p>${tasksContainer[i]}</p>
        </div>
        <div class="icons">
        <i class="fa-solid fa-pencil" onclick="update(${i})"></i>
        <i class="delete fa-solid fa-xmark" onclick="removeTask(${i})"></i>
        </div></div>`
    }
    document.getElementById("tasks").innerHTML = container;
    taskInput.value = "";
}

document.getElementById('add').addEventListener('click', addTask)

function removeTask(i) {
    tasksContainer.splice(i, 1);
    display()
    localStorage.setItem("unfinished", JSON.stringify(tasksContainer))
}

function removeFinished(i) {
    finishedContainer.splice(i, 1);
    displayFinished()
    localStorage.setItem("finished", JSON.stringify(finishedContainer))
}

function finishTask(i) {
    let finished = tasksContainer.splice(i, 1);
    display()
    localStorage.setItem("unfinished", JSON.stringify(tasksContainer))
    finishedContainer.push(...finished)
    localStorage.setItem("finished", JSON.stringify(finishedContainer))
    displayFinished();
}

function displayFinished() {
    let container;
    if (finishedContainer == false) {
        container = ''
    } else {
        container = '<p><i class="fa-solid fa-award" style="margin-right:10px"></i>finished tasks</p>';
    }
    for (let i = 0; i < finishedContainer.length; i++) {
        container += `<div class="task-content">
        <div><i class="check fa-solid fa-check"></i>
        <p>${finishedContainer[i]}</p>
        </div>
        <div class="icons">
        <i class="delete fa-solid fa-xmark" onclick="removeFinished(${i})"></i>
        </div></div>`
    }
    document.getElementById("finished-tasks").innerHTML = container;
    taskInput.value = "";
}


let currentIndex = 0;
function update(i) {
    currentIndex = i;
    taskInput.value = tasksContainer[i]
    document.getElementById("add").style.display = "none"
    document.getElementById("update").style.display = "inline-block"
}

function addUpdate() {
    tasksContainer[currentIndex] = taskInput.value;
    display()
    localStorage.setItem("unfinished", JSON.stringify(tasksContainer))
    document.getElementById("add").style.display = "inline-block"
    document.getElementById("update").style.display = "none"
    taskInput.value = ""
}
document.getElementById('update').addEventListener("click", addUpdate)