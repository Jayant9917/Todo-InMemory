const API_URL = 'http://localhost:3001/todos';


// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try{
        const response = await axios.get(API_URL);
        response.data.forEach(todo => addTodoToDOM(todo));
    } catch (error){
        console.error('failed to load todos:', error.message);
    }
});

// Fetch todos from backend
function fetchTodos() {
    //  write here
}

function addTodoToDOM(todo) {
    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('li');
    todoItem.id = `todo-${todo.id}`;
    todoItem.innerHTML = `
        <input 
            type="checkbox" 
            ${todo.completed ? 'checked' : ''} 
            onchange="toggleTodo('${todo.id}', this.checked)"
        >
        <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <button class="delete-btn" onclick="deleteTodo('${todo.id}')">Delete</button>
    `;
    todoList.appendChild(todoItem);
}

// Add a new todo
document.getElementById('add-todo-btn').addEventListener('click', async () => {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if(!text) return;

    try{
        const response = await axios.post(API_URL, { text });
        addTodoToDOM(response.data);
        input.value = '';
    } catch (error){
        console.log('failed to add todo:', error.message);
    }
});

// Toggle todo completion
async function toggleTodo(id, completed) {
    try {
        await axios.put(`http://localhost:3001/todos/${id}`, { completed }); 
        const span = document.querySelector(`#todo-${id} span`);
        span.classList.toggle('completed', completed);
    } catch(error) {
        console.error("failed to update todo: ", error.message);
    }
}

// Delete a todo
async function deleteTodo(id) {
    try{
        await axios.delete(`${API_URL}/${id}`);
        document.getElementById( "todo-" + id).remove();
    }catch (error){
        console.log("failed to delete todo: " + error.message);
    }
}