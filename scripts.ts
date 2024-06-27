interface todo {
    id: number;
    task: string;
    completed: boolean;
}

const input = document.getElementById("task") as HTMLInputElement;
const button = document.getElementById("addButton") as HTMLButtonElement;
const list = document.querySelector(".todoList") as HTMLUListElement;

let todoList: todo[] = [];

function addTask() {
    const task = input.value.trim();
    if(task !== ''){
        const newTask: todo = {id: Date.now(), task: task, completed: false};
        todoList.push(newTask);
        renderTodoList();
        input.value = '';
    }
}

function renderTodoList() {
    list.innerHTML = '';
    todoList.forEach(todo =>{
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            renderTodoList();
        });

        const label = document.createElement('label');
        label.textContent = todo.task;

        const deleteIcon = document.createElement('img');
        deleteIcon.src = './src/delete.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.addEventListener('click', () => {
            deleteTask(todo.id);
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteIcon);

        list.appendChild(li);
    });
}

function deleteTask(id: number){
    todoList = todoList.filter(todo => todo.id != id);
    renderTodoList();
}

button.addEventListener('click', addTask);