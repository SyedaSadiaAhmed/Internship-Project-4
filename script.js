document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Retrieve tasks from localStorage if available
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-name ${task.completed ? 'completed' : ''}" data-index="${index}">${task.name}</span>
                <span class="edit-btn" data-index="${index}">&#9998;</span>
                <span class="delete-btn" data-index="${index}">&times;</span>
                <button class="complete-btn" data-index="${index}">${task.completed ? 'Incomplete' : 'Complete'}</button>
            `;
            li.addEventListener('click', (e) => {
                if (e.target.classList.contains('task-name')) {
                    toggleTaskCompletion(e.target.dataset.index);
                } else if (e.target.classList.contains('edit-btn')) {
                    editTask(e.target.dataset.index);
                } else if (e.target.classList.contains('delete-btn')) {
                    deleteTask(e.target.dataset.index);
                } else if (e.target.classList.contains('complete-btn')) {
                    toggleTaskCompletion(e.target.dataset.index);
                }
            });
            todoList.appendChild(li);
        });
        saveTasks();
    }

    // Function to add a new task
    function addTask(taskName) {
        tasks.push({ name: taskName, completed: false });
        renderTasks();
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Function to edit a task
    function editTask(index) {
        const newTaskName = prompt('Edit task:', tasks[index].name);
        if (newTaskName !== null) {
            tasks[index].name = newTaskName;
            renderTasks();
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = todoInput.value.trim();
        if (taskName !== '') {
            addTask(taskName);
            todoInput.value = '';
        }
    });

    // Render initial tasks
    renderTasks();
});
