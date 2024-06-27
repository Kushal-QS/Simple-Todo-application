var input = document.getElementById("task");
var button = document.getElementById("addButton");
var list = document.querySelector(".todoList");
var todoList = [];
function addTask() {
    var task = input.value.trim();
    if (task !== '') {
        var newTask = { id: Date.now(), task: task, completed: false };
        todoList.push(newTask);
        renderTodoList();
        input.value = '';
    }
}
function renderTodoList() {
    list.innerHTML = '';
    todoList.forEach(function (todo) {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function () {
            todo.completed = checkbox.checked;
            renderTodoList();
        });
        var label = document.createElement('label');
        label.textContent = todo.task;
        var deleteIcon = document.createElement('img');
        deleteIcon.src = './src/delete.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.addEventListener('click', function () {
            deleteTask(todo.id);
        });
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteIcon);
        list.appendChild(li);
    });
}
function deleteTask(id) {
    todoList = todoList.filter(function (todo) { return todo.id != id; });
    renderTodoList();
}
button.addEventListener('click', addTask);
