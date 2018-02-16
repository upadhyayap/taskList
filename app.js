//  Define all vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const deleteItem = document.querySelector('.delete-item');


// Loading all esisted tasks

(function loadAllTasks() {
    console.log('IEFE Called');
    let savedTasks = localStorage.getItem('tasks');
    let tasks = JSON.parse(savedTasks);
    if (tasks !== null) {
        tasks.forEach((task) => {
            createTaskElement(task);
        });   
    } else {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
})();

console.log(taskList);
// Load All event Listeners

loadAllEventListeners();

function loadAllEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    clearBtn.addEventListener('click', clearAllTasks);
    filter.addEventListener('keyup', filterTasks);
}

function createTaskElement(taskName){
    const task  = document.createElement('li');
    const link = document.createElement('a');
    const iTag = document.createElement('i');
    const text = document.createTextNode(taskName);

    iTag.className = 'fa fa-remove';

    link.className = 'delete-item secondary-content';
    link.setAttribute('href', '#');
    link.appendChild(iTag);

    task.className = 'collection-item';
    task.appendChild(text);
    task.appendChild(link);

    taskList.appendChild(task);
}

function addTask(event) {
    if (taskInput.value === '') {
        alert('Please enter task name');
        return;
    }

    storeTaskLocal(taskInput.value);

    createTaskElement(taskInput.value);

    event.preventDefault();
}

function deleteTask(event) {
    const target = event.target;
    if (target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure want to delete task')) {
            console.log('deleting '+target.parentElement.parentElement.textContent);
            deleteTaskLocal(target.parentElement.parentElement.textContent);
            target.parentElement.parentElement.remove();
        }
    }
}

function clearAllTasks(event) {
    console.log(taskList.childNodes);
    console.log(taskList.children);
    if (confirm('Are you sure want to clear all tasks')) {
         while (taskList.firstChild !==null) {
             taskList.removeChild(taskList.firstChild);
         }
         clearStorage();
    }
}

function filterTasks(event) {
    const filterText = event.target.value.toLowerCase();
    const allTasks = document.querySelectorAll('.collection-item');

    allTasks.forEach(task => {
        if (!task.textContent.toLowerCase().includes(filterText) && filterText.trim() !== '') {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
    
}

function storeTaskLocal(task) {
    // Add element to local storage
    let savedTasks = localStorage.getItem('tasks');
    let tasks;
    
    tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.push(task);
    savedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', savedTasks);
}

function deleteTaskLocal(taskName) {
    //let savedTasks = localStorage.getItem('tasks');
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks !== null && tasks.length > 0) {
        let newTasks = tasks.filter(task => task !== taskName);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    } else {
        console.log('Task not found');
    }
}

function clearStorage() {
    localStorage.clear();
}

