document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '') return;

        addTask(taskText);
        input.value = '';
        input.focus();
    });

    function addTask(taskText) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.classList.add('remove-btn');

        // Mark the task as complete on the click of text
        span.addEventListener('click', () => {
            span.classList.toggle('completed');
        });

        removeBtn.addEventListener('click', () => {
            list.removeChild(li);
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    }
})