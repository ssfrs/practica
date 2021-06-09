const todoContainer = document.getElementById('todo-container');
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = form.querySelector('input').value;
    const newTodo = { description };

    fetch('http://localhost:3000/api/todos', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo),
    })
    .then(response => response.json())
    .then(() => getTodos())
});

function displayTodos(todos) {
    todoContainer.innerHTML = '';
    for (let todo of todos) {
        const li = document.createElement('li');
        li.textContent = todo.description;
        li.classList = todo.done ? "done" : '';

        const span = document.createElement('span');
        span.textContent = 'X';
        li.appendChild(span);

        todoContainer.appendChild(li);

        li.addEventListener('click', function() {
            fetch(`http://localhost:3000/api/todos/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: todo.description,
                    done: !todo.done
                })
            })
            .then(response => response.json())
            .then(() => getTodos())
        });
// ---------------------
        span.addEventListener('click', function(e) {
            e.stopPropagation();
            fetch(`http://localhost:3000/api/todos/${todo.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(() => getTodos())
        });
// ---------------------
    }
}

function getTodos() {
    fetch('http://localhost:3000/api/todos', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(todos => displayTodos(todos))
}

getTodos();