window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || []

    inputContent = document.querySelector('#input-content')

    newTodoForm = document.querySelector('.new-todo-form')

    newTodoForm.addEventListener('submit', e=> {
        e.preventDefault()

        const todo = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo)

        localStorage.setItem("todos", JSON.stringify(todos))

       

        e.target.reset()

        DisplayTodos()
    })


    DisplayTodos()

    
})

function DisplayTodos(){
    const todoList = document.querySelector('.todo-list')
    
    todoList.innerHTML = ''
    

    todos.forEach(todo => {
        const todoItem = document.createElement('div')

        todoItem.classList.add('todo-item');

        const label = document.createElement('label')

        const input = document.createElement('input')
        input.type = 'checkbox';
        input.checked = todo.done;

        const span = document.createElement('span')
        span.classList.add('bubble')

        const content = document.createElement('div')
        content.classList.add('todo-content')
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

        const deleteButton = document.createElement('img');
        deleteButton.classList.add('cross')
        deleteButton.setAttribute("src", "images/icon-cross.svg")


        label.appendChild(input)
        label.appendChild(span)

        todoItem.appendChild(label)
        todoItem.appendChild(content)
        todoItem.appendChild(deleteButton)


        if (todo.done) {
            todoItem.classList.add('done')
        }

        input.addEventListener('change', (e) => {
            todo.done = e.target.checked

            localStorage.setItem('todos', JSON.stringify(todos))

            if (todo.done) {
                todoItem.classList.add('done')
            } else {
                todoItem.classList.remove('done')
            }

            DisplayTodos()
        })

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo)

            localStorage.setItem('todos', JSON.stringify(todos))

            DisplayTodos()
        })

        todoList.appendChild(todoItem);
    })

}


function TodoBar(){
    // Create the todo options section dynamically
    const todoOptions = document.createElement('div')
    todoOptions.classList.add('todo-options')

    const itemsLeft = document.createElement('div')
    itemsLeft.classList.add('items-left', 'state')
    itemsLeft.textContent = `${todos.filter(todo => !todo.done).length} Items Left`

    const states = document.createElement('div')
    states.classList.add('states')

    const allState = document.createElement('div')
    allState.classList.add('all', 'state')
    allState.textContent = 'All'

    const activeState = document.createElement('div')
    activeState.classList.add('active', 'state')
    activeState.textContent = 'Active'

    const completedState = document.createElement('div')
    completedState.classList.add('completed', 'state')
    completedState.textContent = 'Completed'

    const clearCompleted = document.createElement('div')
    clearCompleted.classList.add('clear-completed', 'state')
    clearCompleted.textContent = 'Clear Completed'

    states.appendChild(allState)
    states.appendChild(activeState)
    states.appendChild(completedState)

    todoOptions.appendChild(itemsLeft)
    todoOptions.appendChild(states)
    todoOptions.appendChild(clearCompleted)

    todoList.appendChild(todoOptions)
}
