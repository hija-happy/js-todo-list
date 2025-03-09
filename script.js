
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('todo-list');

console.log(taskForm);
let allTodos = getTodos();
updateTodoList();

taskForm.addEventListener('submit', function(e){
    e.preventDefault(); //this prevents the page from reloading
    addTodo();
})

//1

function addTodo(){
    const todoText = taskInput.value.trim();
    if(todoText.length>0){
        allTodos.push(todoText);
        updateTodoList();
        saveTodos();
        taskInput.value="";

    }
    else {
        alert("Please Enter a Task to Proceed")
    }
   
    console.log(allTodos);
}

// 2
// as while addto works only current todo . we update alltodo for each adds

function updateTodoList () {
    taskList.innerHTML = ""; //
    allTodos.forEach((todo,codeindex) => {
        todoItem = createTodoItem(todo, codeindex);
        taskList.appendChild(todoItem);
    });
}

//3

function createTodoItem(todo,codeindex){
    const todoID = "todo-"+codeindex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" name="" id="${todoID}">
                <label for="${todoID}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
        

                <label for="${todoID}" class="todo-text">
                    ${todo}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener('click', ()=> {
        deleteTodoLI(codeindex);
    })

    return todoLI;
}


// detele the li on click
function deleteTodoLI(index){
    allTodos = allTodos.filter((_,i)=> i !==index);
    saveTodos();
    updateTodoList();
}


//to save the todos locally

function saveTodos(){
    const todoJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJSON);
}


function getTodos(){
    const todos = localStorage.getItem("todos") ||"[]";
    return JSON.parse(todos);
}