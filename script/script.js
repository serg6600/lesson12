'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

if (localStorage.data === undefined) {
    localStorage.data = JSON.stringify([]);
}
const todoData = JSON.parse(localStorage.data);

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, i){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = 
            '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        localStorage.data = JSON.stringify(todoData);

        const buttonTodoCompleted = li.querySelector('.todo-complete');
        buttonTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.data = JSON.stringify(todoData);
            render();
        });

        const buttonTodoDelete = li.querySelector('.todo-remove');
        buttonTodoDelete.addEventListener('click', function(){
            todoData.splice(i,1);
            localStorage.data = JSON.stringify(todoData);
            render();
        });
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value === ''){
        alert('Необходимо ввести задачу!');
        return;
    }
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    
    todoData.push(newTodo);
    headerInput.value = '';
    render();
});

render();