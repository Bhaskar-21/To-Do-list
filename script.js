document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-button');

    let tasks = [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
        });

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });

        attachEventListeners();
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    const editTask = (index) => {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            renderTasks();
        }
    };

    const attachEventListeners = () => {
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                toggleComplete(index);
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editTask(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteTask(index);
            });
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            renderTasks(filter);
        });
    });

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
